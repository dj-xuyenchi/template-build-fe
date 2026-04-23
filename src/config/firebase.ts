"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  deleteToken,
  getMessaging,
  getToken,
  Messaging,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let app: FirebaseApp;
let messaging: Messaging | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export const requestFcmToken = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    // ❗ CHỈ delete khi chắc chắn cần reset
    const shouldReset = true;

    if (shouldReset) {
      await deleteToken(messaging!);
    }

    // 🔥 quan trọng: đợi SW ổn định
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging!, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};

export { messaging };
