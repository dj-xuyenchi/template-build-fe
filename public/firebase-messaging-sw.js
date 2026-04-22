importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");


firebase.initializeApp({
    apiKey: "AIzaSyBxQNdHyXe0s0tuup32FxoOjt6c3muvXKA",
    authDomain: "lab-e36fc.firebaseapp.com",
    projectId: "lab-e36fc",
    messagingSenderId: "1099314529451",
    appId: "1:1099314529451:web:4c32ff036745981270e3ee",
});


const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log("📩 Background FCM:", payload);

    const title = payload.notification?.title || payload.data?.title || "New message";
    const body = payload.notification?.body || payload.data?.body || "";

    self.registration.showNotification(title, {
        body: body,
        icon: "/icon.png", // optional nhưng nên có
    });
});



