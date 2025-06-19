// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCHmpfTl4VwZ0-YXjHav4uODE1n0irSZUM",
  authDomain: "shayari-jo-nikale-dil-se.firebaseapp.com",
  projectId: "shayari-jo-nikale-dil-se",
  storageBucket: "shayari-jo-nikale-dil-se.firebasestorage.app",
  messagingSenderId: "911162647122",
  appId: "1:911162647122:web:cf491310fa9dc9d1b1f58b",
  measurementId: "G-FJJT83Z76Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const form = document.getElementById("shayariForm");
const shayariList = document.getElementById("shayariList");
const toggleBtn = document.getElementById("themeToggle");

// Theme toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Submit Shayari
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const author = document.getElementById("author").value.trim();
  const text = document.getElementById("text").value.trim();

  if (!author || !text) return;

  try {
    await addDoc(collection(db, "shayaris"), {
      author,
      text,
      timestamp: serverTimestamp()
    });

    form.reset();
    loadShayaris(); // Refresh list
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

// Load Shayaris from Firestore
async function loadShayaris() {
  shayariList.innerHTML = "";

  const q = query(collection(db, "shayaris"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const { author, text } = doc.data();

    const div = document.createElement("div");
    div.className = "shayari-card";
    div.innerHTML = `<p>${text}</p><p><strong>- ${author}</strong></p>`;
    shayariList.appendChild(div);
  });
}

// Load Shayaris on page load
loadShayaris();
