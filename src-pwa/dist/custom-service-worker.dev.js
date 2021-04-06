"use strict";

/* eslint-disable no-undef */
// eslint-disable-next-line no-multiple-empty-lines
var _require = require('workbox-precaching'),
    precacheAndRoute = _require.precacheAndRoute;

precacheAndRoute(self.__WB_MANIFEST);
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
firebase.initializeApp({
  messagingSenderId: '839709301841'
}); // eslint-disable-next-line no-unused-vars

var messaging = firebase.messaging();
self.addEventListener('install', function (e) {
  e.waitUntil(self.skipWaiting());
});