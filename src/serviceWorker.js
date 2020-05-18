self.addEventListener("install", (event) => {
  console.log("Service Worker: install fired.");
  event.waitUntil(
    caches.open("v1").then((cache) => {
      const path = "/src";
      const items = [
        `${path}/`,
        `${path}/index.html`,
        `${path}/styles.css`,
        `${path}/app.js`,
        `${path}/images/sunflower.jpg`,
        `${path}/images/icyWaterfall.jpg`,
        `${path}/images/cherryBlossom.jpg`,
        `${path}/images/leaves.jpg`,
      ];
      console.log("Opened cache. Adding items:", items);
      return cache.addAll(items);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: activate fired.");
  // log(e);
});

self.addEventListener("message", (e) => {
  // log(e);
});

self.addEventListener("fetch", (e) => {
  console.log("Service Worker: fetch fired:", e.request.url);
});
