const path = '/service-worker-demo';

function log(type = 'log', message) {
  const prefix = [
    '%cService Worker%c',
    `
  color: black;
  background-color: #FFC857;
  padding: 0 4px;
  font-weight: bold;

  `,
    '',
  ];

  switch (type) {
    case 'info':
      console.info(...prefix, message);
      break;
    default:
      console.log(...prefix, message);
  }
}

function info(message) {
  log('info', message);
}

self.addEventListener('install', (event) => {
  info('install');
  event.waitUntil(
    caches.open('v1').then((cache) => {
      const items = [
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
  info('activate');
});

self.addEventListener('message', (event) => {
  info('message');
  console.log(e);
});

self.addEventListener('fetch', (event) => {
  // I run a local server and live reload the browser with browser-sync
  // Ignore browser-sync requests
  if (event.request.url.includes('browser-sync')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        info(`fetch (serving from CacheStorage): ${event.request.url}`);
        return response;
      } else {
        info(`fetch (no cache, sending request): ${event.request.url}`);
        return fetch(event.request);
      }
    })
  );
});
