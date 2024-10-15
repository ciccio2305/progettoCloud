export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.c04bd26e.js","imports":["_app/immutable/entry/start.c04bd26e.js","_app/immutable/chunks/index.96ff6eb1.js","_app/immutable/chunks/singletons.47735b1b.js","_app/immutable/chunks/index.3b85a721.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.451134e4.js","imports":["_app/immutable/entry/app.451134e4.js","_app/immutable/chunks/index.96ff6eb1.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
