// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyB0ve0hhVHovFW0zYUyDrLfltW077rkESY",
  authDomain: "test2-512bd.firebaseapp.com",
  projectId: "test2-512bd",
  storageBucket: "test2-512bd.appspot.com",
  messagingSenderId: "938239998913",
  appId: "1:938239998913:web:6e895652d47a8263728d40",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo-dark.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
