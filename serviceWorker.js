const path = '/service-worker-demo';

// sdfsdlkj

self.addEventListener('install', (event) => {
  console.log('[🤖SW] install fired.');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      const items = [
        `${path}/`,
        `${path}/index.html`,
        `${path}/styles.css`,
        `${path}/images/sunflower.jpg`,
        `${path}/images/icyWaterfall.jpg`,
        `${path}/images/cherryBlossom.jpg`,
        `${path}/images/leaves.jpg`,
      ];
      console.log('Opened cache. Adding items:', items);
      return cache.addAll(items);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[🤖SW] activate fired.');
});

self.addEventListener('message', (event) => {
  console.log('[🤖SW] message fired.');
  console.log(e);
});

self.addEventListener('fetch', (event) => {
  console.log('[🤖SW] fetch fired:', event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// self.addEventListener('fetch', (event) => {
//   console.log('[🤖SW] fetch fired:', event.request.url);
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then((response) => {
//             const responseClone = response.clone();
//             caches.open('v1').then((cache) => {
//               cache.put(event.request, responseClone);
//             });
//             return response;
//           })
//           .catch(() => caches.match(`${path}/images/leaves.jpg`));
//       }
//     })
//   );
// });
