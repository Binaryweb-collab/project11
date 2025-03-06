// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjTmyxKqg6HqrPiwy57SfedHG2XuF8KGg",
    authDomain: "neocampus-e2679.firebaseapp.com",
    databaseURL: "https://neocampus-e2679-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "neocampus-e2679",
    storageBucket: "neocampus-e2679.firebasestorage.app",
    messagingSenderId: "661813565916",
    appId: "1:661813565916:web:8e47a80cbff1495b751719",
    measurementId: "G-Y4X6B53HQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to store user data in Firebase Realtime Database
function storeUserData(userid, password) {
    const usersRef = ref(db, "login-data");
    const newUserRef = push(usersRef); // Create a unique key for each user
    set(newUserRef, { userid, password }) // Store user credentials
        .then(() => alert("User registered successfully!"))
        .catch((error) => console.error("Error storing data:", error));
}

// Function to validate user login
function validateUser(userid, password) {
    const usersRef = ref(db, "login-data");

    get(usersRef).then((snapshot) => {
        if (snapshot.exists()) {
            let userFound = false;

            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.userid === userid && userData.password === password) {
                    userFound = true;
                }
            });

            if (userFound) {
                alert("Login successful!");
                window.location.href = "dashboard.html"; // Redirect to main page
            } else {
                alert("Invalid User ID or Password.");
            }
        } else {
            alert("No users found.");
        }
    }).catch((error) => {
        console.error("Error fetching data:", error);
    });
}

// Export functions
export { storeUserData, validateUser };



