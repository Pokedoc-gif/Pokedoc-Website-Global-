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

const products = [
  { id: 1, name: "PSA UV Protective Case", price: "R350" },
  { id: 2, name: "Pokemon Eevee GX Premium Eeveelutions Binder", price: "R950" },
  { id: 3, name: "Pokemon Eevee GX Premium Umbreon Binder", price: "R1500" },
  { id: 4, name: "Graded Slab Binder", price: "R1000" },
  { id: 5, name: "Pokemon Eevee GX Premium Eeveelutions Card Sleeves", price: "R60" },
  { id: 6, name: "Card Sleeves", price: "R80" },
  { id: 7, name: "Pokemon Eeveelutions Card Frame Case CSGC (Promo card included)", price: "R600" },
  { id: 8, name: "Umbreon Display Card Frame", price: "R150" },
  { id: 9, name: "Mew Display Card Frame", price: "R150" },
  { id: 10, name: "Pokemon Accessories Metal Tin", price: "R60" },
  { id: 11, name: "Limited Edition Pokemon Center Lapel Pin", price: "R150" },
  { id: 12, name: "Pokemon Uno Card Game", price: "R100" },
  { id: 13, name: "Pokemon Monopoly Board Game", price: "R550" },
  { id: 14, name: "Marnie Trainer Collection Gift Tin", price: "R2500" },
  { id: 15, name: "151 Collection Figure Blind Box", price: "R700" },
  { id: 16, name: "151 Puzzle Refrigerator Magnet Set", price: "R500" },
  { id: 17, name: "Pokemon 151 Starters Promo Frame", price: "R500" },
  { id: 18, name: "Pokemon 30th Anniversary First Partner Illustration Collection", price: "R500" },
  { id: 19, name: "Pokemon Mega Dream Booster Box M2a", price: "R2500" },
  { id: 20, name: "151 Pikachu Exclusive Booster Box", price: "R1500" },
  { id: 21, name: "151 Psyduck Exclusive Booster Box", price: "R1500" },
  { id: 22, name: "151 Gengar Exclusive Booster Box", price: "R1500" },
  { id: 23, name: "151 Double Pikachu Exclusive Booster Box", price: "R1500" },
  { id: 24, name: "Pokémon Dark Crystal Blaze CSV5C - Slim Booster Box", price: "R1000" },
  { id: 25, name: "Ponyta 151 Booster Box CBB4C", price: "R900" },
  { id: 26, name: "Dragon Boat Festival Box", price: "R800" },
  { id: 27, name: "151 Pokemon 2025 New Year Gift Box", price: "R2500" },
  { id: 28, name: "2007 POKEMON JAPANESE DIAMOND & PEARL MOONLIT PURSUIT #164 UMBREON MOONLIT PURSUIT-1ST ED", price: "R1000" },
  { id: 29, name: "2001 POKEMON JAPANESE VS #070 BLAINE'S TYPHLOSION 1ST EDITION", price: "R2750" },
  { id: 30, name: "2021 POKEMON JAPANESE SWORD & SHIELD VMAX CLIMAX #244 FA/UMBREON V VMAX CLIMAX", price: "R1100" },
  { id: 31, name: "2006 POKEMON JAPANESE MIRACLE CRYSTAL #041 JIRACHI EX-HOLO MIRACLE CRYSTAL-1ST ED.", price: "R8150" },
  { id: 32, name: "2022 POKEMON GO JAPANESE #055 RADIANT EEVEE", price: "R550" },
  { id: 33, name: "2022 POKEMON JAPANESE SWORD & SHIELD VSTAR UNIVERSE #218 FA/RAIKOU V VSTAR UNIVERSE", price: "R750" },
  { id: 34, name: "2022 POKEMON JAPANESE SWORD & SHIELD PARADIGM TRIGGER #123 FA/LUGIA VSTAR PARADIGM TRIGGER-UR", price: "R900" },
  { id: 35, name: "2023 POKEMON JAPANESE SV1V-VIOLET ex #089 BOMBIRDIER ART RARE", price: "R300" },
  { id: 36, name: "2009 POKEMON JAPANESE HEARTGOLD COLLECTION #022 TOTODILE-REV.FOIL HEARTGOLD COLL-1ST ED.", price: "R1200" },
  { id: 37, name: "2022 POKEMON JAPANESE SWORD & SHIELD VSTAR UNIVERSE #210 FA/LEAFEON VSTAR VSTAR UNIVERSE", price: "R1100" },
  { id: 38, name: "2021 POKEMON JAPANESE SWORD & SHIELD VMAX CLIMAX #244 FA/UMBREON V VMAX CLIMAX", price: "R3000" },
  { id: 39, name: "2022 POKEMON JAPANESE SWORD & SHIELD DARK PHANTASMA #072 FA/PARASECT DARK PHANTASMA", price: "R350" },
  { id: 40, name: "2001 POKEMON JAPANESE EXPEDITION #030 TAUROS EXPEDITION-1ST EDITION", price: "R4600" },
  { id: 41, name: "2026 POKEMON JAPANESE NINJA SPINNER #115 MEGA FLOETTE EX", price: "R2700" }
];

const PRICE_COUNT = products.length;

async function loadPrices() {
  try {
    const docSnap = await getDoc(doc(db, "store", "prices"));
    if (!docSnap.exists()) return;
    const prices = docSnap.data();
    for (let i = 1; i <= PRICE_COUNT; i++) {
      const el = document.getElementById("display" + i);
      const value = prices["price" + i];
      if (el && value) el.innerText = value + " each";
    }
  } catch {
    console.warn("Could not load prices.");
  }
}
window.loadPrices = loadPrices;

async function updatePrices() {
  const prices = {};
  for (let i = 1; i <= PRICE_COUNT; i++) {
    const input = document.getElementById("price" + i);
    if (input) prices["price" + i] = input.value.trim();
  }
  try {
    await setDoc(doc(db, "store", "prices"), prices);
    alert("Prices Updated Globally ✅");
    loadPrices();
  } catch {
    alert("Could not update prices.");
  }
}
window.updatePrices = updatePrices;

function renderRequestCard(data, id, admin = false) {
  if (admin) {
    return `<div class="admin-card"><strong>${data.name}</strong><p>${data.details || "No details"}</p><p>${data.votes} votes</p></div>`;
  }
  return `<div class="request-card"><h4>${data.name}</h4><p>Votes: ${data.votes}</p><button type="button" onclick="voteRequest('${id}')">Vote 🔥</button></div>`;
}

async function sendItemRequest() {
  const nameInput = document.getElementById("requestName");
  const detailsInput = document.getElementById("requestDetails");
  if (!nameInput || !detailsInput) return;

  const name = nameInput.value.trim();
  const details = detailsInput.value.trim();
  if (!name) return alert("Enter item name");

  const normalizedName = name.toLowerCase().replace(/\s+/g, " ").trim();
  const requestsRef = collection(db, "requests");
  const existing = await getDocs(query(requestsRef, where("normalizedName", "==", normalizedName)));

  try {
    if (!existing.empty) {
      await updateDoc(doc(db, "requests", existing.docs[0].id), { votes: increment(1) });
    } else {
      await addDoc(requestsRef, { name, normalizedName, details, votes: 1, created: new Date() });
    }
    nameInput.value = "";
    detailsInput.value = "";
    loadRequests();
    alert("Request submitted 🔥");
  } catch {
    alert("Could not submit request.");
  }
}
window.sendItemRequest = sendItemRequest;

async function loadRequests() {
  const container = document.getElementById("mostRequested");
  if (!container) return;
  try {
    const snapshot = await getDocs(query(collection(db, "requests"), orderBy("votes", "desc")));
    if (snapshot.empty) {
      container.innerHTML = "<p>No requests yet.</p>";
      return;
    }
    container.innerHTML = "";
    snapshot.forEach(docSnap => {
      container.innerHTML += renderRequestCard(docSnap.data(), docSnap.id, false);
    });
  } catch {
    container.innerHTML = "<p>Could not load requests.</p>";
  }
}
window.voteRequest = async function (id) {
  try {
    await updateDoc(doc(db, "requests", id), { votes: increment(1) });
    loadRequests();
  } catch {
    alert("Could not vote right now.");
  }
};

async function loadAdminRequests() {
  const container = document.getElementById("adminRequests");
  if (!container) return;
  try {
    const snapshot = await getDocs(query(collection(db, "requests"), orderBy("votes", "desc")));
    if (snapshot.empty) {
      container.innerHTML = "<p>No requests yet.</p>";
      return;
    }
    container.innerHTML = "";
    snapshot.forEach(docSnap => {
      container.innerHTML += renderRequestCard(docSnap.data(), docSnap.id, true);
    });
  } catch {
    container.innerHTML = "<p>Could not load admin requests.</p>";
  }
}
window.loadAdminRequests = loadAdminRequests;

window.toggleAdmin = function () {
  const panel = document.getElementById("adminPanel");
  if (!panel) return;
  panel.style.display = panel.style.display === "block" ? "none" : "block";
};

window.customerSignIn = function () {
  const email = document.getElementById("customerEmail");
  if (!email || !email.value.trim()) return alert("Enter your email first.");
  window.currentCustomerEmail = email.value.trim();
  const el = document.getElementById("signedInUser");
  if (el) el.innerText = "Signed in as: " + window.currentCustomerEmail;
};

window.customerSignUp = function () {
  const email = document.getElementById("customerEmail");
  if (!email || !email.value.trim()) return alert("Enter your email first.");
  window.currentCustomerEmail = email.value.trim();
  const el = document.getElementById("signedInUser");
  if (el) el.innerText = "Account created for: " + window.currentCustomerEmail;
};

window.customerSignOut = function () {
  window.currentCustomerEmail = "";
  const el = document.getElementById("signedInUser");
  if (el) el.innerText = "Signed out.";
};

window.checkoutCart = function () {
  if (!window.cart || !window.cart.length) return alert("Your cart is empty.");
  const items = window.cart.map(item => item.name).join(", ");
  const email = window.currentCustomerEmail || "customer";
  const message = encodeURIComponent(`Hi PokeDoc! I am ${email} and I want to order: ${items}`);
  window.open("https://wa.me/" + "8615253131891" + "?text=" + message, "_blank");
};

window.addEventListener("load", () => {
  loadPrices();
  loadRequests();
});