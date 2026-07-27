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
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

async function loadPrices() {
  const docRef = doc(db, "store", "prices");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const prices = docSnap.data();
    for (let i = 1; i <= 19; i++) {
      const el = document.getElementById("display" + i);
      if (el && prices["price" + i]) el.innerText = prices["price" + i];
    }
  }
}

async function updatePrices() {
  const prices = {};
  for (let i = 1; i <= 19; i++) {
    const input = document.getElementById("price" + i);
    if (input) prices["price" + i] = input.value;
  }

  await setDoc(doc(db, "store", "prices"), prices);
  alert("Prices Updated Globally ✅");
  loadPrices();
}

window.updatePrices = updatePrices;
window.addEventListener("load", loadPrices);

async function sendItemRequest() {
  const nameInput = document.getElementById("requestName");
  const detailsInput = document.getElementById("requestDetails");
  if (!nameInput || !detailsInput) return;

  const name = nameInput.value.trim();
  const details = detailsInput.value.trim();

  if (!name) {
    alert("Enter item name");
    return;
  }

  const requestsRef = collection(db, "requests");
  const q = query(requestsRef, where("name", "==", name));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const existingDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, "requests", existingDoc.id), { votes: increment(1) });
  } else {
    await addDoc(requestsRef, { name, details, votes: 1, created: new Date() });
  }

  nameInput.value = "";
  detailsInput.value = "";
  loadRequests();
  alert("Request submitted 🔥");
}

window.sendItemRequest = sendItemRequest;

async function loadRequests() {
  const container = document.getElementById("mostRequested");
  if (!container) return;

  container.innerHTML = "";
  const q = query(collection(db, "requests"), orderBy("votes", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    container.innerHTML += `
      <div class="request-card">
        <h4>${data.name}</h4>
        <p>Votes: ${data.votes}</p>
        <button type="button" onclick="voteRequest('${docSnap.id}')">Vote 🔥</button>
      </div>
    `;
  });
}

window.voteRequest = async function (id) {
  await updateDoc(doc(db, "requests", id), { votes: increment(1) });
  loadRequests();
};

async function loadAdminRequests() {
  const container = document.getElementById("adminRequests");
  if (!container) return;

  container.innerHTML = "";
  const snapshot = await getDocs(collection(db, "requests"));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    container.innerHTML += `
      <div class="admin-card">
        <strong>${data.name}</strong>
        <p>${data.details || "No details"}</p>
        <p>${data.votes} votes</p>
      </div>
    `;
  });
}

window.loadAdminRequests = loadAdminRequests;
window.addEventListener("load", loadRequests);

async function adminLogin() {
  const email = prompt("Admin Email:");
  const password = prompt("Admin Password:");

  if (!email || !password) {
    alert("Login cancelled");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    const panel = document.getElementById("adminPanel");
    if (panel) panel.style.display = "block";
    alert("Admin Logged In ✅");
  } catch {
    alert("Login Failed ❌");
  }
}

window.toggleAdmin = adminLogin;