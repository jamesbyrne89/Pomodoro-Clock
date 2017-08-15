var cacheVersion = 'v4';
var cacheFiles = [
	'/',
	'/temp/assets/scripts/min/app.js',
	'/temp/assets/styles/styles.css',
	'/temp/assets/styles/fonts/Brandon_bld.WOFF',
	'/temp/assets/styles/fonts/Brandon_blk.WOFF',
	'/temp/assets/styles/fonts/Brandon_light.WOFF',
	'/temp/assets/styles/fonts/Brandon_reg.WOFF',
	'/temp/assets/styles/fonts/Brandon_thin.WOFF'
];

self.addEventListener('install', function(e) {
	console.log('[serviceWorker] installed')
	e.waitUntil(
		caches.open(cacheVersion).then(function(cache) {
	
			return cache.addAll(cacheFiles);
		})
	)
});

// self.addEventListener('activate', function(e) {
// 	console.log('[serviceWorker] activated')
// 	e.waitUntil(
// 		caches.keys().then(function(cacheVersions) {
// 			return Promise.all(cacheVersions.map(function(thisCacheVersion) {
// 				console.log(cacheVersions)
// 				if (thisCacheVersion !== cacheVersion) {
// 					console.log('removing cached files from', thisCacheVersion)
// 					return caches.delete(thisCacheVersion);
// 				}
// 			}));
// 		});
// 	);
// });

self.addEventListener('fetch', function(e) {
	console.log('[serviceWorker] fetch');
	e.respondWith(

		caches.open(cacheVersion).then(function(cache) {
			return cache.match(e.request)
			.then(function(response) {
				if (response) {
					return response;
				}
				return fetch(e.request);
			})
		})

	)
});