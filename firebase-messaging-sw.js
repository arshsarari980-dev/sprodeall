
importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDmU7KvUbntR593b7THp6JmrPVvuWmZpoY",
  authDomain: "appnetick-notifications.firebaseapp.com",
  databaseURL: "https://appnetick-notifications-default-rtdb.firebaseio.com",
  projectId: "appnetick-notifications",
  storageBucket: "appnetick-notifications.firebasestorage.app",
  messagingSenderId: "614590987394",
  appId: "1:614590987394:web:3aab07d17bbbbc29b8889b",
  measurementId: "G-V71PTT0W62"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/IMG_1057.png",
      badge: "/IMG_1057.png"
    }
  );
});
