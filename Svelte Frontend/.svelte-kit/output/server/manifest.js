export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.39307999.js","imports":["_app/immutable/entry/start.39307999.js","_app/immutable/chunks/index.96ff6eb1.js","_app/immutable/chunks/singletons.7fe40cd3.js","_app/immutable/chunks/index.3b85a721.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.27fe6eca.js","imports":["_app/immutable/entry/app.27fe6eca.js","_app/immutable/chunks/index.96ff6eb1.js"],"stylesheets":[],"fonts":[]}},
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
