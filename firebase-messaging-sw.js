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
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  const title = payload.notification?.title || payload.data?.title || "Notification";
  const options = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: "/IMG_1057.png",
    badge: "/IMG_1057.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // If a custom URL was provided in data payload, open it, otherwise open root
  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Focus existing open tab if available
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
