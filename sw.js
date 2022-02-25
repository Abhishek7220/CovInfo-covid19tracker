//on install - the application shell cached
self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open("sw-cache").then(function (cache) {
			return cache.add(
				"index.html",
				"./scripts/countries.js",
				"./scripts/countUp.umd.js",
				"./scripts/index.js",
				"./scripts/microinterections.js",
				"./css/main.css"
			);
		})
	);
});

//with request network

self.addEventListener("fetch", function (event) {
	event.respondWith(
		//try the cache

		caches.match(event.request).then(function (response) {
			// return it if there is a response, or else fetch again
			return response || fetch(event.request);
		})
	);
});
