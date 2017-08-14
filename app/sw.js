"use strict";

let cacheVersion = 'v1';
let cacheFiles = [
		'index.html',
		'temp/assets/scripts/min/app.js'
]

self.addEventListener('install', function(e) {
	console.log('[serviceWorker] installed')

	e.waitUntil(
		caches.open(cacheVersion).then(function(cache) {
			console.log('Caching files');
			return cache.addAll(cacheFiles)
		})
		)
})

self.addEventListener('activate', function(e) {
	console.log('[serviceWorker] activated')

		e.waitUntil(

				caches.keys().then(function(cacheVersions) {
					return Promise.all(cacheVersions.map(function(thisCacheVersion) {
						console.log(cacheVersions)
						if (thisCacheVersion !== cacheVersion) {
							console.log('removing cached files from', thisCacheVersion)
							return caches.delete(thisCacheVersion);
						}
					}))
				})
			)

});

self.addEventListener('fetch', function(e) {
	console.log('[serviceWorker] fetch')
	e.respondWith(

		caches.open(cacheVersion).then(function(cache) {
			return cache.match(e.request)
		})

		);
})

