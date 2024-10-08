export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.8b0535ae.js","imports":["_app/immutable/entry/start.8b0535ae.js","_app/immutable/chunks/index.96ff6eb1.js","_app/immutable/chunks/singletons.fa7a9878.js","_app/immutable/chunks/index.3b85a721.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.4e78b438.js","imports":["_app/immutable/entry/app.4e78b438.js","_app/immutable/chunks/index.96ff6eb1.js"],"stylesheets":[],"fonts":[]}},
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
