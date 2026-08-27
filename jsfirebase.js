import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  increment,
  query,
  orderBy,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCxkZZbcAJphfnlTwztK_9LDAf-AXKcXA",
  authDomain: "pokedoc-store.firebaseapp.com",
  projectId: "pokedoc-store",
  storageBucket: "pokedoc-store.firebasestorage.app",
  messagingSenderId: "342362381577",
  appId: "1:342362381577:web:be6877326b4e92830b07d8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const PRICE_IDS = [
  ...Array.from({ length: 41 }, (_, index) => index + 1),
  42
];

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

function formatPrice(value) {
  const price = String(value ?? "").trim();

  if (!price) return "";
  if (/sold out|sold/i.test(price)) return price;
  if (/each/i.test(price)) return price;

  return `${price} each`;
}

async function loadPrices() {
  try {
    const snapshot = await getDoc(doc(db, "store", "prices"));

    if (!snapshot.exists()) return;

    const prices = snapshot.data();

    PRICE_IDS.forEach(id => {
      const element = document.getElementById(`display${id}`);
      const value = prices[`price${id}`];

      if (element && value !== undefined && value !== null) {
        element.textContent = formatPrice(value);
      }
    });
  } catch (error) {
    console.warn("Could not load prices.", error);
  }
}

window.loadPrices = loadPrices;

async function updatePrices() {
  const prices = {};

  PRICE_IDS.forEach(id => {
    const input = document.getElementById(`price${id}`);

    if (input) {
      const value = input.value.trim();

      if (value) {
        prices[`price${id}`] = value;
      }
    }
  });

  try {
    await setDoc(doc(db, "store", "prices"), prices, { merge: true });
    await loadPrices();
    alert("Prices Updated Globally ✅");
  } catch (error) {
    console.error("Price update failed:", error);
    alert("Could not update prices.");
  }
}

window.updatePrices = updatePrices;

function renderRequestCard(data, id, admin = false) {
  const safeName = escapeHTML(data.name || "Unnamed request");
  const safeDetails = escapeHTML(data.details || "No details");
  const votes = Number(data.votes);
  const safeVotes = Number.isFinite(votes) && votes >= 0 ? votes : 0;

  if (admin) {
    return `
      <div class="admin-card">
        <strong>${safeName}</strong>
        <p>${safeDetails}</p>
        <p>${safeVotes} votes</p>
      </div>
    `;
  }

  return `
    <div class="request-card">
      <h4>${safeName}</h4>
      <p>Votes: ${safeVotes}</p>
      <button type="button" onclick="voteRequest(${JSON.stringify(String(id))})">
        Vote 🔥
      </button>
    </div>
  `;
}

async function sendItemRequest() {
  const nameInput = document.getElementById("requestName");
  const detailsInput = document.getElementById("requestDetails");

  if (!nameInput || !detailsInput) return;

  const name = nameInput.value.trim();
  const details = detailsInput.value.trim();

  if (!name) {
    alert("Enter item name.");
    nameInput.focus();
    return;
  }

  if (name.length > 100 || details.length > 500) {
    alert("Please keep the item name under 100 characters and details under 500 characters.");
    return;
  }

  const normalizedName = name.toLowerCase().replace(/\s+/g, " ").trim();

  try {
    const requestsRef = collection(db, "requests");
    const existing = await getDocs(
      query(requestsRef, where("normalizedName", "==", normalizedName))
    );

    if (!existing.empty) {
      await updateDoc(
        doc(db, "requests", existing.docs[0].id),
        { votes: increment(1) }
      );
    } else {
      await addDoc(requestsRef, {
        name,
        normalizedName,
        details,
        votes: 1,
        created: serverTimestamp()
      });
    }

    nameInput.value = "";
    detailsInput.value = "";

    await loadRequests();
    alert("Request submitted 🔥");
  } catch (error) {
    console.error("Request submission failed:", error);
    alert("Could not submit request.");
  }
}

window.sendItemRequest = sendItemRequest;

async function loadRequests() {
  const container = document.getElementById("mostRequested");

  if (!container) return;

  try {
    const snapshot = await getDocs(
      query(collection(db, "requests"), orderBy("votes", "desc"))
    );

    if (snapshot.empty) {
      container.innerHTML = "<p>No requests yet.</p>";
      return;
    }

    container.innerHTML = "";

    snapshot.forEach(request => {
      container.insertAdjacentHTML(
        "beforeend",
        renderRequestCard(request.data(), request.id)
      );
    });
  } catch (error) {
    console.error("Request loading failed:", error);
    container.innerHTML = "<p>Could not load requests.</p>";
  }
}

window.voteRequest = async id => {
  if (!id) return;

  try {
    await updateDoc(doc(db, "requests", String(id)), {
      votes: increment(1)
    });

    await loadRequests();
  } catch (error) {
    console.error("Vote failed:", error);
    alert("Could not vote right now.");
  }
};

async function loadAdminRequests() {
  const container = document.getElementById("adminRequests");

  if (!container) return;

  try {
    const snapshot = await getDocs(
      query(collection(db, "requests"), orderBy("votes", "desc"))
    );

    if (snapshot.empty) {
      container.innerHTML = "<p>No requests yet.</p>";
      return;
    }

    container.innerHTML = "";

    snapshot.forEach(request => {
      container.insertAdjacentHTML(
        "beforeend",
        renderRequestCard(request.data(), request.id, true)
      );
    });
  } catch (error) {
    console.error("Admin request loading failed:", error);
    container.innerHTML = "<p>Could not load admin requests.</p>";
  }
}

window.loadAdminRequests = loadAdminRequests;

async function adminLogin() {
  const email = prompt("Admin Email:");
  const password = prompt("Admin Password:");

  if (!email || !password) {
    alert("Login cancelled.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);

    const panel = document.getElementById("adminPanel");

    if (panel) {
      panel.style.display = "block";
    }

    await loadAdminRequests();
    alert("Admin logged in ✅");
  } catch (error) {
    console.error("Admin login failed:", error);
    alert("Login failed ❌");
  }
}

window.toggleAdmin = function () {
  const panel = document.getElementById("adminPanel");

  if (!panel) return;

  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    adminLogin();
  }
};

window.addEventListener("load", () => {
  loadPrices();
  loadRequests();
});