const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  }),
  databaseURL: "https://spro-deal-a87cd-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Notification API Running 🚀"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Notification Server Running on Port " + PORT);
});
