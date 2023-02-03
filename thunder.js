function addSomeUsefulMath () {
	Math.srandom = function (a, b, cut) {
		if (cut != undefined && cut != NaN && cut != null) {
			return a + Math.round((b - a) * Math.random() * Math.pow(10, cut)) / Math.pow(10, cut);
		} else {
			return a + (b - a)*Math.random();
		}
	}

	Math.rsign = function () { // може вийде прискорити завдяки 1 - Math.round(Math.random() * 2)
		if (Math.random() > 0.5) {
			return 1;
		} else {
			return -1;
		}
	}

	Math.llength = function (x0, y0, x, y) {
		if (typeof x0 == "object") {
			if (x0.x != NaN && typeof x0.x == "number" && x0.y != NaN && typeof x0.y == "number") {
				if (x0.x0 != NaN && typeof x0.x0 == "number" && x0.y0 != NaN && typeof x0.y0 == "number") {
					return Math.sqrt(((x0.x - x0.x0)**2) + ((x0.y - x0.y0)**2));
				} else {
					return Math.sqrt((x0.x**2) + (x0.y**2));
				}
			} else if (x0.x2 != NaN && typeof x0.x2 == "number" && x0.y2 != NaN && typeof x0.y2 == "number") {
				return Math.sqrt(((x0.x2 - x0.x1)**2) + ((x0.y2 - x0.y1)**2));
			} else {
				return NaN;
			}
		} else if (typeof y0 == "number") {
			if (x == null || x == NaN || x == undefined || y == null || y == NaN || y == undefined) {
				return Math.sqrt((x0**2) + (y0**2));
			} else {
				return Math.sqrt(((x - x0)**2) + ((y - y0)**2));
			}
		}
	}

	Math.getLineConstants = function (x0, y0, x, y) {
		if (typeof x0 == "object") {
			return {
				x0: x0.x0,
				x: x0.x,
				y0: x0.y0,
				y: x0.y,
				A: x0.y - x0.y0,
				B: x0.x0 - x0.x,
				C: (x0.y0 * x0.x) - (x0.x0 * x0.y),
				tan: (x0.y - x0.y0) / (x0.x - x0.x0),
				rad: Math.atan((x0.y - x0.y0) / (x0.x - x0.x0)),
				b: ((x0.y0 * x0.x) - (x0.x0 * x0.y)) / (x0.x - x0.x0),
				len: Math.sqrt(((x0.x - x0.x0)**2) + ((x0.y - x0.y0)**2)),
				vecx: x0.x - x0.x0,
				vecy: x0.y - x0.y0
			};
		} else if (typeof x0 == "number") {
			return {
				x0: x0,
				x: x,
				y0: y0,
				y: y,
				A: y - y0,
				B: x0 - x,
				C: (y0 * x) - (x0 * y),
				tan: (y - y0) / (x - x0),
				rad: Math.atan((y - y0) / (x - x0)),
				b: ((y0 * x) - (x0 * y)) / (x - x0),
				len: Math.sqrt(((x - x0)**2) + ((y - y0)**2)),
				vecx: x - x0,
				vecy: y - y0
			};
		}
	}

	Math.Line = {
		tan: (x0, y0, x, y) => {
			return (y - y0) / (x - x0);
		},

		b: (x0, y0, x, y) => {
			return ((y0 * x) - (x0 * y)) / (x - x0);
		},

		vec: (a0, a) => {
			return a - a0;
		}
	};

	Math.BC = {
		points: {},
		keyMap: {
			x0: "x0",
			y0: "y0",
			x1: "x1",
			y1: "y1",
			x2: "x2",
			y2: "y2",
			x: "x",
			y: "y"
		},
		keysOfKeyMap: ["x0","y0","x1","y1","x2","y2","x","y"],
		setKeyMap: function (obj, valuesInsteadOfParams) {
			const keys = Object.keys(obj);
			if (valuesInsteadOfParams) {
				for (let i = 0; i < 8; i++) {
					this.keyMap[this.keysOfKeyMap[i]] = obj[keys[i]];
				}
			} else {
				for (let i = 0; i < 8; i++) {
					this.keyMap[this.keysOfKeyMap[i]] = keys[i];
				}
			}
		},
		setKeyMapA: function (arr) {
			for (let i = 0; i < Math.min(arr.length, 8); i++) {
				this.keyMap[this.keysOfKeyMap[i]] = arr[i];
			}
		},
		resetKeyMap: function () {
			this.keyMap = {
				x0: "x0",
				y0: "y0",
				x1: "x1",
				y1: "y1",
				x2: "x2",
				y2: "y2",
				x: "x",
				y: "y"
			}
		},
		set: function (x0, y0, x1, y1, x2, y2, x, y) {
			if (typeof y == "number") {
				this.points.x0 = x0;
				this.points.y0 = y0;
				this.points.x1 = x1;
				this.points.y1 = y1;
				this.points.x2 = x2;
				this.points.y2 = y2;
				this.points.x = x;
				this.points.y = y;
			} else {
				this.points.x1 = x0;
				this.points.y1 = y0;
				this.points.x2 = x1;
				this.points.y2 = y1;
			}
		},
		setO: function (obj) {
			for (let i = 0; i < Math.min(8, Object.keys(obj).length); i++) {
				if (typeof obj[this.keyMap[this.keysOfKeyMap[i]]] == "number") {
					this.points[this.keysOfKeyMap[i]] = obj[this.keyMap[this.keysOfKeyMap[i]]];
				}
			}
		},
		setA: function (arr) {
			if (arr.length >= 8) {
				this.points.x0 = arr[0];
				this.points.y0 = arr[1];
				this.points.x1 = arr[2];
				this.points.y1 = arr[3];
				this.points.x2 = arr[4];
				this.points.y2 = arr[5];
				this.points.x = arr[6];
				this.points.y = arr[7];
			} else {
				this.points.x1 = arr[0];
				this.points.y1 = arr[1];
				this.points.x2 = arr[2];
				this.points.y2 = arr[3];
			}
		},
		getByT: function (t) {
			return {
				x:  (((1 - t)**3) * this.points.x0) +
					(((1 - t)**2) * 3 * t * this.points.x1) + 
					((t**2) * 3 * (1 - t) * this.points.x2) +
					((t**3) * this.points.x),
				y:  (((1 - t)**3) * this.points.y0) +
					(((1 - t)**2) * 3 * t * this.points.y1) + 
					((t**2) * 3 * (1 - t) * this.points.y2) +
					((t**3) * this.points.y)
			};
		},
		getByX: function (x) {
			return  (((1 - x)**3) * this.points.y0) +
					(((1 - x)**2) * 3 * x * this.points.y1) + 
					((x**2) * 3 * (1 - x) * this.points.y2) +
					((x**3) * this.points.y);
		},
		getByY: function (y) {
			return  (((1 - y)**3) * this.points.x0) +
					(((1 - y)**2) * 3 * y * this.points.x1) + 
					((y**2) * 3 * (1 - y) * this.points.x2) +
					((y**3) * this.points.x);
		}
	};

	Math.rotatepI = (r, x, y, x0 = 0, y0 = 0) => {
		x = x - x0;
		y = y - y0;

		return {
			x: (Math.cos(r) * x) - (Math.sin(r) * y) + x0,
			y: (Math.cos(r) * y) + (Math.sin(r) * x) + y0
		};
	}

	Math.rotatepC = (vx, vy, x, y, x0 = 0, y0 = 0) => {
		x = x - x0;
		y = y - y0;

		const nx = ((vy * x) + (vx * y)),
			ny = -((vx * x) - (vy * y)),
			coef = Math.sqrt(((x**2) + (y**2)) / ((nx**2) + (ny**2)));

		return {
			x: (nx * coef) + x0,
			y: (ny * coef) + y0	
		};
	}
}

addSomeUsefulMath();

let ThunderJSProperties = {
	color: getComputedStyle(document.documentElement).getPropertyValue("--lightning-main"), // only hex and rgba formats allowed {LIGHTNING}
	blurColor: getComputedStyle(document.documentElement).getPropertyValue("--lightning-glow"), // only hex and rgba formats allowed {LIGHTNING}
	blurRadius: 8,
	colorFading: [1, 1],
	lineFading: [0.7, 2], // fades ONLY unblur line {LBRANCH}
	algorythm: "teslacoil", /* teslacoil [default. The slowest and on my point the most beautiful and naturaly-looked one], {LIGHTNING}
							 - fast [faster then tesla coil],
							 - oneshot [good for natural generated lightning in other words to animate it for a few hundreds of ms and hide immidiately]
							*/
	branches: [1, 3],
	branchRecursions: 0,
	fps: 25, // if <= 0 ligtning will update as fast as browser and monitor can {LIGHTNING}
	ignoreIterator: true, // in case when fps is unset (0) iterator that will do kinda fps controller, but actually in another way {LIGHTNING}
	ctx: null,
	ctxb: null,
	setContexts: function (ctx, ctxb) {
		this.ctx = ctx;
		this.ctxb = ctxb;
	}
};

ThunderJSTypeMaps = [
	[0], // teslacoil
	[1] //  fast
// drawF() instead of draw(), 
];



class LBranch {
	diffStep = 44 * window.devicePixelRatio; // (pixels)
	diffDifus = 40 * window.devicePixelRatio;
	diffPostsegmDifus = 3 * window.devicePixelRatio; // (pixels) це розсип сегментів перед фінальним диференціюванням
	postDiffStep = 3 * window.devicePixelRatio; // (pixels) [aprox.] UP TO 6 PIXELS
	postDiffDifus = 2 * window.devicePixelRatio;
	expandXCoef = 1;
	continuosMutationSpeed = [0.025, 0.075];
	mutationChanse = 0.05; // chance per every .mutate() call

	static randActivator1 (x) {
		return (0.3 * Math.tanh((24 * x) - 22)) + (0.2 * Math.tanh((10 * x) - 2.4)) + 0.5;
	}

	constructor (x0, y0, x, y, preferences = {recursions: 0}, recursionPosition /*additional controller*/) {
		// DEBUGGING - DEBUGGING - DEBUGGING - DEBUGGING - DEBUGGING - DEBUGGING - DEBUGGING - 
		if (ThunderJSProperties.ctx instanceof CanvasRenderingContext2D) {
			this.ctx = ThunderJSProperties.ctx;
		} else {
			throw new Error("You haven't put appropriate MAIN canvas to ThunderJSProperties.ctx");
		}

		if (ThunderJSProperties.ctxb instanceof CanvasRenderingContext2D) {
			this.ctxb = ThunderJSProperties.ctxb;
			this.ctxb.canvas.style.filter = "blur(" + ThunderJSProperties.blurRadius + "px)";
		} else {
			throw new Error("You haven't put appropriate BLUR canvas to ThunderJSProperties.ctxb");
		}

		this.recursionPosition = recursionPosition || 0; // stores actual recursion position for debugging
		// coordinates n axis param's
		this._x0 = x0;
		this._y0 = y0;
		this._x = x;
		this._y = y;
		this.axisConsts = Math.getLineConstants(x0, y0, x, y);
		this.axisLength = this.axisConsts.len;
		this.x0 = this._x0;
		this.y0 = this._y0;
		this.x = this._x0;
		this.y = this._y0 + this.axisLength;
		this.n = Math.srandom(3, 7, 0);
		// consts and controllers
		this.normalVariation = [0, 0.7];
		// separating
		this.segments = [];
		this.arcs = [];
		this._arcsNormals = [];
		this.arcsNormals = []; // [{vecx: , vecy: , speed: }, ...] <<< its structure
		this.transsegments = []; // rotated segments
		this.postsegments = []; // segmets that will be draw after rotating

		// CREATING CARCASS

		this.createBreakLine();
		this.middleProcessing(); // there are assigns inside

		// ROTATING CARCASS

		this.transsegments = this.rotateV(this.axisConsts.vecx, this.axisConsts.vecy, this.arcs);

		for (let i = 0; i < this.arcsNormals.length; i++) {
			const npoint = Math.rotatepC(this.axisConsts.vecx, this.axisConsts.vecy, this._arcsNormals[i].vecx, this._arcsNormals[i].vecy);
			this.arcsNormals[i].vecx = npoint.x;
			this.arcsNormals[i].vecy = npoint.y;
		}

		// adding branch
		// if (this.recursionPosition < preferences.recursions) {
		// 	const k = Math.srandom(1, this.segments.length - 1, 0);
		// 	this.branchConnectorIndex = k;
		// 	this.branch = new LBranch(400, 400, this.transsegments[k].x0, this.transsegments[k].y0, preferences, this.recursionPosition + 1);
		// }
	}

	// --------------- CARCASS ALGORITHMS ------------------------ CARCASS ALGORITHMS ------

	createBreakLine () { // creates carcass based on lines
		let proportion = [];
		Math.BC.set(0, 0.25, 0.5, 0, 0.2, 1, 1, 1);

		for (let i = 0; i < this.n; i++) {
			proportion[i] = Math.round(Math.BC.getByT(Math.random()).y * 100);
			if (i > 0) {
				proportion[i] += proportion[i - 1];
			}
		}

		let sumcoef = proportion[proportion.length - 1];
		let bezcoef = 0.5; // цей параметр треба автоматизувати
		let normal;

		for (let i = 0; i < this.n - 1; i++) {
			normal = { //set normal length
				x0: this.x0,
				y0: this.y0 + (this.axisLength * proportion[i] / sumcoef)
			};

			Math.BC.set(0, 0, 1, 0.4, 0.5, 2 - ((this.n - 3) / 5), 1, 0); // автоматизація від кількості нормалей

			const normalLength = (this.normalVariation[0] + (Math.BC.getByT(Math.random()).y * (this.normalVariation[1] - this.normalVariation[0]))) * this.axisLength;

			Math.BC.set(0, 0, bezcoef, bezcoef, 1, 1);

			let reflection = Math.rsign();

			if (Math.BC.getByT(Math.random()).y > 0.5) {
				reflection = -reflection;
			}

			normal.x = this.x0 + (reflection * normalLength);
			normal.y = normal.y0;

			if (i == 0) {
				this.segments[0] = {x0: this.x0, y0: this.y0, x: normal.x, y: normal.y};
			} else {
				this.segments[i] = {x0: this.segments[i - 1].x, y0: this.segments[i - 1].y, x: normal.x, y: normal.y};
			}
		}

		this.segments.push({x0: normal.x, y0: normal.y, x: this.x, y: this.y});
	}

	middleProcessing () { // "middle" transformation template
		this.toLayerI(2);
		this.toDiffer(this.diffStep, this.diffDifus);
		this.toLayerI(1);
		// this.toLayerIU(this.segments, 2, 0.3, 4);
		this.arcsNormals = this.toDifferIS(2, 7, 18);
		this._arcsNormals = structuredClone(this.arcsNormals); // UNcompatable with old browsers!!!!!!!!!!!!!
		this.arcs = structuredClone(this.segments); // UNcompatable with old browsers!!!!!!!!!!!!!
	}

	// --------------- ACTION methods ------------------- ACTION methods -------------------
	
	toDiffer (step, diffusion) { // void
		let _segments = [{
			x0: this.segments[0].x0,
			y0: this.segments[0].y0
		}];

		const end = this.segments[this.segments.length - 1];

		let p = 0, // preventer from for (true) {...}
			c = 0; // counter for _segments[]

		for (let i = 0; i < this.segments.length && p < 2000; p++) {
			if (Math.llength(_segments[c].x0, _segments[c].y0, this.segments[i].x, this.segments[i].y) < step) {
				i++;
				continue;
			}

			const _actsegm = {
				vecx: this.segments[i].x - this.segments[i].x0,
				vecy: this.segments[i].y - this.segments[i].y0,
				tan: (this.segments[i].y - this.segments[i].y0) / (this.segments[i].x - this.segments[i].x0),
				b: (((this.segments[i].y0 - _segments[c].y0) * (this.segments[i].x - _segments[c].x0)) - ((this.segments[i].x0 - _segments[c].x0) * (this.segments[i].y - _segments[c].y0))) / (this.segments[i].x - this.segments[i].x0)
			};
			
			let nsegm = {
				x1: (-(_actsegm.tan * _actsegm.b) + Math.sqrt((step * step * ((_actsegm.tan * _actsegm.tan) + 1)) - (_actsegm.b * _actsegm.b))) / (1 + (_actsegm.tan * _actsegm.tan)),
				x2: (-(_actsegm.tan * _actsegm.b) - Math.sqrt((step * step * ((_actsegm.tan * _actsegm.tan) + 1)) - (_actsegm.b * _actsegm.b))) / (1 + (_actsegm.tan * _actsegm.tan))
			};

			nsegm.y1 = (_actsegm.tan * nsegm.x1) + _actsegm.b;
			nsegm.y2 = (_actsegm.tan * nsegm.x2) + _actsegm.b;
			
			if (Math.sign(nsegm.x1 - nsegm.x2) == Math.sign(_actsegm.vecx) && Math.sign(nsegm.y1 - nsegm.y2) == Math.sign(_actsegm.vecy)) {
				_segments[c].x = nsegm.x1;
				_segments[c].y = nsegm.y1;
			} else {
				_segments[c].x = nsegm.x2;
				_segments[c].y = nsegm.y2;
			}

			const _len = Math.sqrt((_segments[c].x**2) + (_segments[c].y**2)); // I'd optimize this in future
			const _diff = Math.srandom(-diffusion, diffusion, 0);

			const __segment = {
				x: _segments[c].x - (_diff * _segments[c].y / _len) + _segments[c].x0,
				y: _segments[c].y + (_diff * _segments[c].x / _len) + _segments[c].y0
			};

			_segments[c].x = __segment.x;
			_segments[c].y = __segment.y;

			c++;

			_segments[c] = {
				x0: _segments[c - 1].x,
				y0: _segments[c - 1].y
			};
		}

		_segments[c].x = end.x;
		_segments[c].y = end.y;

		this.segments = _segments;
	}

	toDifferA (step, diffusion) { // void (instead of toDifer() it calculate radius not from the previos diffused point, but from undifused one. Provides diffusions more than step!)
		let __segment = {
			x0: this.segments[0].x0,
			y0: this.segments[0].y0
		};

		let _segments = [{
			x0: this.segments[0].x0,
			y0: this.segments[0].y0
		}];

		const end = this.segments[this.segments.length - 1];

		let p = 0, // preventer from for (...; true; i) {}
			c = 0; // counter for _segments[]

		for (let i = 0; i < this.segments.length && p < 2000; p++) {
			if (Math.llength(__segment.x0, __segment.y0, this.segments[i].x, this.segments[i].y) < step) {
				i++;
				continue;
			}

			const actsegm = {
				vecx: this.segments[i].x - this.segments[i].x0,
				vecy: this.segments[i].y - this.segments[i].y0,
				tan: (this.segments[i].y - this.segments[i].y0) / (this.segments[i].x - this.segments[i].x0),
				b: (((this.segments[i].y0 - __segment.y0) * (this.segments[i].x - __segment.x0)) - ((this.segments[i].x0 - __segment.x0) * (this.segments[i].y - __segment.y0))) / (this.segments[i].x - this.segments[i].x0)
			};
			
			let nsegm = {
				x1: (-(actsegm.tan * actsegm.b) + Math.sqrt((step * step * ((actsegm.tan * actsegm.tan) + 1)) - (actsegm.b * actsegm.b))) / (1 + (actsegm.tan * actsegm.tan)),
				x2: (-(actsegm.tan * actsegm.b) - Math.sqrt((step * step * ((actsegm.tan * actsegm.tan) + 1)) - (actsegm.b * actsegm.b))) / (1 + (actsegm.tan * actsegm.tan))
			};

			nsegm.y1 = (actsegm.tan * nsegm.x1) + actsegm.b;
			nsegm.y2 = (actsegm.tan * nsegm.x2) + actsegm.b;
			
			if (Math.sign(nsegm.x1 - nsegm.x2) == Math.sign(actsegm.vecx) && Math.sign(nsegm.y1 - nsegm.y2) == Math.sign(actsegm.vecy)) {
				_segments[c].x = nsegm.x1;
				_segments[c].y = nsegm.y1;
			} else {
				_segments[c].x = nsegm.x2;
				_segments[c].y = nsegm.y2;
			}

			const _len = Math.sqrt((_segments[c].x**2) + (_segments[c].y**2));
			const _diff = Math.srandom(-diffusion, diffusion, 0);

			let ___segment = {
				x0: __segment.x0,
				y0: __segment.y0
			};

			__segment.x0 = _segments[c].x + __segment.x0;
			__segment.y0 = _segments[c].y + __segment.y0;

			const bufsegment = { // rotation
				x: _segments[c].x - (_diff * _segments[c].y / _len) + ___segment.x0,
				y: _segments[c].y + (_diff * _segments[c].x / _len) + ___segment.y0
			};

			_segments[c].x = bufsegment.x;
			_segments[c].y = bufsegment.y;

			c++;

			_segments[c] = {
				x0: _segments[c - 1].x,
				y0: _segments[c - 1].y
			};
		}

		_segments[c].x = end.x;
		_segments[c].y = end.y;

		this.segments = _segments;
	}

	toDifferIS (minstep, maxstep, diffusion) {
		let normals = [];
		let _segments = [{
			x0: this.x0,
			y0: this.y0
		}];

		let c = 0;

		for (let i = 0; i < this.segments.length; i++) {
			const actsegm = this.segments[i];
			const actlen = Math.llength(actsegm);
			const interval = [minstep / actlen, maxstep / actlen];

			let prop = Math.srandom(interval[0], interval[1]);

			for (let propsum = 0; propsum < 1 - interval[1]; propsum += prop) {
				propsum += prop;

				const actrand = Math.random();
				const _diff = (this.constructor.randActivator1(actrand) * diffusion * 2) - diffusion;

				const __segment = {
					x: (actsegm.x - actsegm.x0) * _diff / actlen,
					y: (actsegm.y - actsegm.y0) * _diff / actlen
				};

				_segments[c].x = actsegm.x0 + ((actsegm.x - actsegm.x0) * propsum) - __segment.y;
				_segments[c].y = actsegm.y0 + ((actsegm.y - actsegm.y0) * propsum) + __segment.x;

				normals.push({
					vecx: -__segment.y,
					vecy: __segment.x,
					percent: 0,
					speed: this.continuosMutationSpeed[0] + (((actrand * 100) % 1) * (this.continuosMutationSpeed[1] - this.continuosMutationSpeed[0]))
				});

				_segments[++c] = {
					x0: _segments[c - 1].x,
					y0: _segments[c - 1].y
				};

				prop = Math.srandom(interval[0], interval[1]);
			}

			_segments[c].x = actsegm.x;
			_segments[c].y = actsegm.y;
		}

		this.segments = _segments;
		return normals;
	}

	toDifferI (segments, step, diffusion) { // array of object of nums
		let _segments = [{
			x0: segments[0].x0,
			y0: segments[0].y0
		}];

		let c = 0;
		let __actsegm = {x: this.x0, y: this.y0};

		for (let i = 0; i < segments.length; i++) {
			const _actsegm = {
				x0: __actsegm.x,
				y0: __actsegm.y,
				x: segments[i].x, // + Math.srandom(-this.diffPostsegmDifus, this.diffPostsegmDifus, 0)
				y: segments[i].y, // + Math.srandom(-this.diffPostsegmDifus, this.diffPostsegmDifus, 0)
			};

			// console.log(_actsegm);

			__actsegm = _actsegm;

			const actsegm = Math.getLineConstants(_actsegm);
			const pieces = actsegm.len / step;
			const coef = step / actsegm.len;

			for (let j = 0; j < pieces - 1; j++) {
				_segments[c].x = actsegm.x0 + (coef * j * actsegm.vecx) + Math.srandom(-diffusion, diffusion, 0);
				_segments[c].y = actsegm.y0 + (coef * j * actsegm.vecy) + Math.srandom(-diffusion, diffusion, 0);
				_segments[++c] = {
					x0: _segments[c - 1].x,
					y0: _segments[c - 1].y
				};
			}

			_segments[c].x = actsegm.x + Math.srandom(-diffusion, diffusion, 0);
			_segments[c].y = actsegm.y + Math.srandom(-diffusion, diffusion, 0);
			_segments[++c] = {
				x0: _segments[c - 1].x,
				y0: _segments[c - 1].y
			};
		}

		return _segments;
	}
	
	toLayerI (layers) { // void
		let _segments = []; // buff
		let skew = -1;

		for (let k = 0; k < layers; k++) { // layers
			let j = 0; // _segments[] counter

			for (let i = 0; i < this.segments.length; i++) {
				let transprop = 0.5;

				if (j == 0) {
					skew = {
						x0: this.x0,
						y0: this.y0,
						x: this.segments[i].x0 + ((this.segments[i].x - this.segments[i].x0) * transprop),
						y: this.segments[i].y0 + ((this.segments[i].y - this.segments[i].y0) * transprop)
					};
				} else {
					skew = {
						x0: _segments[j - 1].x,
						y0: _segments[j - 1].y,
						x: this.segments[i].x0 + ((this.segments[i].x - this.segments[i].x0) * transprop),
						y: this.segments[i].y0 + ((this.segments[i].y - this.segments[i].y0) * transprop)
					};
				}

				if (Math.llength(skew) > (layers - k) * this.postDiffStep * 3) {
					_segments[j++] = skew;
				}
			}

			_segments[j] = { // connector
				x0: _segments[j - 1].x,
				y0: _segments[j - 1].y,
				x: this.segments[this.segments.length - 1].x,
				y: this.segments[this.segments.length - 1].y
			};

			this.segments = _segments;
			_segments = [];
		}
	}

	toLayerIU (sarr, layers, transprop = 0.5, treshold = 2) { // void
		let _segments = []; // buff

		for (let k = 0; k < layers; k++) { // layers
			let j = 0; // _segments[] counter

			_segments[j++] = {
				x0: this.x0,
				y0: this.y0,
				x: sarr[0].x - ((sarr[0].x - sarr[0].x0) * transprop),
				y: sarr[0].y - ((sarr[0].y - sarr[0].y0) * transprop)
			};

			let _len = Math.llength(_segments[j - 1].x, _segments[j - 1].y, sarr[0].x, sarr[0].y);

			for (let i = 1; i < sarr.length; i++) {
				let _transprop = _len / Math.llength(sarr[i]);

				let skew = {
					x0: _segments[j - 1].x,
					y0: _segments[j - 1].y
				};

				if (_transprop >= 1) {
					skew.x = sarr[i].x;
					skew.y = sarr[i].y;
				} else {
					skew.x = sarr[i].x0 + ((sarr[i].x - sarr[i].x0) * _transprop);
					skew.y = sarr[i].y0 + ((sarr[i].y - sarr[i].y0) * _transprop);
				}

				if (Math.llength(skew) < this.postDiffStep * treshold) {
					continue;
				}

				_segments[j++] = skew;

				let __segment = {
					x0: skew.x,
					y0: skew.y,
					x: sarr[i].x - ((sarr[i].x - sarr[i].x0) * transprop),
					y: sarr[i].y - ((sarr[i].y - sarr[i].y0) * transprop)
				};

				if (Math.llength(__segment) < this.postDiffStep * treshold) {
					continue;
				}

				_segments[j++] = __segment;

				_len = Math.llength(__segment.x, __segment.y, sarr[i].x, sarr[i].y);
			}

			_segments[j] = { // connector
				x0: _segments[j - 1].x,
				y0: _segments[j - 1].y,
				x: sarr[sarr.length - 1].x,
				y: sarr[sarr.length - 1].y
			};

			sarr = _segments;
			_segments = [];
		}

		return sarr;
	}

	// UPDATING - UPDATING - UPDATING - UPDATING - UPDATING - UPDATING - UPDATING -

	getRegularMutationOf (sarr, narr) {
		if (sarr.length != narr.length + 1) {
			throw new Error("Нормалей чи сегментів не стільки скіко треба, бовдуре!");
		}

		let _segments = [{
			x0: sarr[0].x0,
			y0: sarr[0].y0
		}];

		let i;

		for (i = 0; i < narr.length; i++) {
			narr[i].percent += narr[i].speed;
			// narr[i].percent = Math.abs(narr[i].per);
			narr[i].percent %= 2;
			// if (i == 0) {
			// 	console.log(narr[i].percent);
			// }
			const compPercent = -(2 * Math.abs(narr[i].percent - 1)) + 2;
			_segments[i].x = sarr[i].x - (narr[i].vecx * compPercent);
			_segments[i].y = sarr[i].y - (narr[i].vecy * compPercent);

			_segments[i + 1] = {
				x0: _segments[i].x,
				y0: _segments[i].y
			};
		}

		_segments[i].x = sarr[i].x;
		_segments[i].y = sarr[i].y;

		return _segments;
	}

	updatePP () {
		this.postsegments = this.getRegularMutationOf(this.transsegments, this.arcsNormals);
		this.postsegments = this.toLayerIU(this.postsegments, 2, 0.2, 1);
		this.postsegments = this.toDifferI(this.postsegments, this.postDiffStep, this.postDiffDifus);
	}

	expand (ex, ey) {
		const radius = Math.llength(this.x0, this.y0, ex, ey);
		const coef = radius / this.axisLength;

		for (let i = 0; i < this.arcs.length; i++) {
			this.transsegments[i] = {
				x0: this.x0 + ((this.arcs[i].x0 - this.x0) * coef),
				y0: this.y0 + ((this.arcs[i].y0 - this.y0) * coef),
				x: this.x0 + ((this.arcs[i].x - this.x0) * coef),
				y: this.y0 + ((this.arcs[i].y - this.y0) * coef)
			};
		}

		for (let i = 0; i < this.arcsNormals.length; i++) {
			const npoint = Math.rotatepC(ex - this.x0, ey - this.y0, this._arcsNormals[i].vecx, this._arcsNormals[i].vecy);
			this.arcsNormals[i].vecx = npoint.x;
			this.arcsNormals[i].vecy = npoint.y;
		}

		this.transsegments = this.rotateV(ex - this.x0, ey - this.y0, this.transsegments);
	}

	// DRAWING - DRAWING - DRAWING - DRAWING - DRAWING - DRAWING - DRAWING

	draw (segments, blur) {
		if (blur) {
			this.ctxb.lineWidth = this.look.lw[1] * window.devicePixelRatio;
			for (let i = 0; i < segments.length; i++) {
				this.ctxb.beginPath();
				this.ctxb.strokeStyle = this.look.blurColor + parseFloat(this.look.colorFading[0] + ((this.look.colorFading[1] - this.look.colorFading[0]) * i / (segments.length - 1))) + ")";
				this.ctxb.moveTo(segments[i].x0, segments[i].y0);
				this.ctxb.lineTo(segments[i].x, segments[i].y);
				this.ctxb.stroke();
			}
		}

		for (let i = 0; i < segments.length; i++) {
			this.ctx.beginPath();
			this.ctx.strokeStyle = this.look.color + parseFloat(this.look.opacity * (this.look.colorFading[0] + ((this.look.colorFading[1] - this.look.colorFading[0]) * i / (segments.length - 1)))) + ")";
			this.ctx.lineWidth = (this.look.lw[0] + ((this.look.lw[1] - this.look.lw[0]) * i / (segments.length - 1))) * window.devicePixelRatio;
			this.ctx.moveTo(segments[i].x0, segments[i].y0);
			this.ctx.lineTo(segments[i].x, segments[i].y);
			this.ctx.stroke();
		}
	}

	drawF (segments, color, lw, blur, blurColor) { // *FOR FAST ALGO*
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";

		if (blur) {
			this.ctxb.beginPath();
			this.ctxb.lineWidth = lw * 2 * window.devicePixelRatio;
			this.ctxb.strokeStyle = blurColor;
			this.ctxb.moveTo(segments[0].x0, segments[0].y0);
			for (let i = 0; i < segments.length; i++) {
				this.ctxb.lineTo(segments[i].x, segments[i].y);
			}

			this.ctxb.stroke();
		}

		this.ctx.lineWidth = lw * window.devicePixelRatio;
		this.ctx.beginPath();
		this.ctx.strokeStyle = color;
		this.ctx.moveTo(segments[0].x0, segments[0].y0);
		for (let i = 0; i < segments.length; i++) {
			this.ctx.lineTo(segments[i].x, segments[i].y);
		}

		this.ctx.stroke();
	}

	// ---------- OTHER HELPFUL methods ------------- OTHER HELPFUL methods -------------------

	rotate (angle, sarr) { // rotate by angle
		let _actvect,
			actvect = Math.rotatepI(angle, sarr[0].x, sarr[0].y, this.x0, this.y0);

		let _segments = [{
			x0: this.x0,
			y0: this.y0,
			x: actvect.x,
			y: actvect.y
		}];

		for (let i = 1; i < sarr.length; i++) {
			_actvect = Math.rotatepI(angle, sarr[i].x0, sarr[i].y0, this.x0, this.y0);
			actvect = Math.rotatepI(angle, sarr[i].x, sarr[i].y, this.x0, this.y0);

			_segments[i] = {
				x0: _actvect.x,
				y0: _actvect.y,
				x: actvect.x,
				y: actvect.y
			};
		}

		return _segments;
	}

	rotateV (vx, vy, sarr) { // rotate by vector
		let _actpoint,
			actpoint = Math.rotatepC(vx, vy, sarr[0].x, sarr[0].y, this.x0, this.y0);

		let _segments = [{
			x0: this.x0,
			y0: this.y0,
			x: actpoint.x,
			y: actpoint.y
		}];

		for (let i = 1; i < sarr.length; i++) {
			_actpoint = Math.rotatepC(vx, vy, sarr[i].x0, sarr[i].y0, this.x0, this.y0);
			actpoint = Math.rotatepC(vx, vy, sarr[i].x, sarr[i].y, this.x0, this.y0);

			_segments[i] = {
				x0: _actpoint.x,
				y0: _actpoint.y,
				x: actpoint.x,
				y: actpoint.y
			};
		}

		return _segments;
	}
}



class Lightning extends LBranch { // creates main lightning branch (it provides drawing and animation of whole thunder)
	spf = 1000 / ThunderJSProperties.fps;
	now;
	then;
	elapsed;

	constructor (x0, y0, x, y, preferences = {recursions: 1}) {
		console.time("full_creation");
		super(x0, y0, x, y, preferences, 0);

		this.look = {
			colorFading: ThunderJSProperties.colorFading,
			opacity: 1
		};

		if (ThunderJSProperties.lineFading.length == 2) {
			this.look.lw = ThunderJSProperties.lineFading;
		} else {
			throw new Error("ThunderJSProperties.lineFading must be an array with two non-negative numbers!");
		}

		let colorBuff;

		switch (true) {
			case /^rgba\W([0-9]{1,3},){3}/.test(ThunderJSProperties.color): // rgba
				colorBuff = ThunderJSProperties.color.split(",");
				colorBuff[3] = parseFloat(colorBuff[3].slice(0, -1), 10);
				this.look.opacity = colorBuff[3];
				this.look.color = colorBuff.slice(0, -1).join(",") + ",";
				break;
			case /^rgb\W([0-9]{1,3},){2}[0-9]{1,3}\W$/.test(ThunderJSProperties.color): // rgb
				this.look.color = ThunderJSProperties.color.replace("rgb", "rgba").slice(0, -1) + ",";
				break;
			case /^#[A-Fa-f0-9]{6}$/.test(ThunderJSProperties.color):
				colorBuff = ThunderJSProperties.color.substring(1).split("");
				this.look.color = "rgba(" + parseInt(colorBuff[0] + colorBuff[1], 16) + ",";
				this.look.color += parseInt(colorBuff[2] + colorBuff[3], 16) + ",";
				this.look.color += parseInt(colorBuff[4] + colorBuff[5], 16) + ",";
				break;
			case /^#[A-Fa-f0-9]{8}$/.test(ThunderJSProperties.color):
				colorBuff = ThunderJSProperties.color.substring(1).split("");
				this.look.color = "rgba(" + parseInt(colorBuff[0] + colorBuff[1], 16) + ",";
				this.look.color += parseInt(colorBuff[2] + colorBuff[3], 16) + ",";
				this.look.color += parseInt(colorBuff[4] + colorBuff[5], 16) + ",";
				this.look.opacity = parseInt(colorBuff[6] + colorBuff[7], 16) / 255;
				break;
			default:
				throw new Error("ThunderJSProperties.color is in unapropriate format! Use 6/8-digit hex code, rgb or rgba");
		}

		switch (true) {
			case /^rgba\W([0-9]{1,3},){3}/.test(ThunderJSProperties.blurColor): // rgba
				colorBuff = ThunderJSProperties.blurColor.split(",");
				this.look.blurColor = colorBuff.slice(0, -1).join(",") + ",";
				break;
			case /^rgb\W([0-9]{1,3},){2}[0-9]{1,3}\W$/.test(ThunderJSProperties.blurColor): // rgb
				this.look.blurColor = ThunderJSProperties.blurColor.replace("rgb", "rgba").slice(0, -1) + ",";
				break;
			case /^#[A-Fa-f0-9]{6,8}$/.test(ThunderJSProperties.blurColor):
				colorBuff = ThunderJSProperties.blurColor.substring(1).split("");
				this.look.blurColor = "rgba(" + parseInt(colorBuff[0] + colorBuff[1], 16) + ",";
				this.look.blurColor += parseInt(colorBuff[2] + colorBuff[3], 16) + ",";
				this.look.blurColor += parseInt(colorBuff[4] + colorBuff[5], 16) + ",";
				break;
			default:
				throw new Error("ThunderJSProperties.blurColor is in unapropriate format! Use 6/8-digit hex code, rgb or rgba");
		}

		// animation
		this.isAnimationAllowed = false;
		console.timeEnd("full_creation");
	}

	// CONTROLING

	expandAll (ex, ey) {
		this.expand(ex, ey);
		// if (this.branch != 0) {
		// 	const k = this.branchConnectorIndex;
			// this.branch.expand(this.transsegments[k].x0, this.transsegments[k].y0);
		// }
	}

	// ANIMATIONS - ANIMATIONS - ANIMATIONS - ANIMATIONS - ANIMATION - ANIMATION - ANIMATION -

	startAnimation () {
		this.isAnimationAllowed = true;
		this.then = Date.now(); // is needed only on fps control animation

		this.animate();
	}

	animate () { // FPS controlled animation
		if (this.isAnimationAllowed) {
			this.now = Date.now();		// fps control
			this.elapsed = this.now - this.then;	// fps control
			if (this.now - this.then > this.spf) {
				this.then = this.now - (this.elapsed % this.spf);
				this.ctx.clearRect(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
				this.ctxb.clearRect(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
				this.updatePP();
				this.draw(this.postsegments, true);
			}
			requestAnimationFrame(() => this.animate());
		}
	}

	animateS () { // S - Streaming animation
		if (this.isAnimationAllowed) {
			this.ctx.clearRect(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
			this.ctxb.clearRect(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
			this.updatePP();
			this.draw(this.postsegments, this.colors.main, 1, true, this.colors.blur);
			requestAnimationFrame(() => this.animateS());
		}
	}

	stopAnimation () {
		this.isAnimationAllowed = false;
	}
}