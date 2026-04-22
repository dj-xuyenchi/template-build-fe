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
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
    });
});



