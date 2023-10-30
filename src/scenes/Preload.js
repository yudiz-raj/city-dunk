
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(0, 540, "background");
		background.setOrigin(0, 0.5);

		// loading
		const loading = this.add.image(960, 913, "loading");

		// innerBar
		const innerBar = this.add.image(764, 913, "inner-bar");
		innerBar.setOrigin(0, 0.5);
		innerBar.visible = false;

		// loading_text
		const loading_text = this.add.text(774, 877, "", {});
		loading_text.setOrigin(0, 0.5);
		loading_text.text = "Loading...";
		loading_text.setStyle({ "fontFamily": "Skia", "fontSize": "26px" });

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 489);
		this.add.existing(logoPrefab);

		this.loading = loading;
		this.innerBar = innerBar;
		this.loading_text = loading_text;
		this.logoPrefab = logoPrefab;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	loading;
	/** @type {Phaser.GameObjects.Image} */
	innerBar;
	/** @type {Phaser.GameObjects.Text} */
	loading_text;
	/** @type {LogoPrefab} */
	logoPrefab;

	/* START-USER-CODE */

	// Write your code here

	preload() {
		this.editorCreate();
		
		this.editorPreload();
		if (window.innerWidth < 1050) {
			this.logoPrefab.setScale(0.7, 0.7).setPosition(360, 350);
			this.innerBar.setX(164);
			this.loading.setX(360);
			this.loading_text.setX(174);
		}
		this.isGameLoaded1 = false;
		this.isGameLoaded2 = false;
		this.load.on(Phaser.Loader.Events.COMPLETE, (p) => {
			this.isGameLoaded1 = true;
		});

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
		);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		const updateProgressBar = () => {
			this.innerBar.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);
			currentInterval++;
			if (currentProgress >= 1.07) {
				clearInterval(progressInterval);
				this.isGameLoaded2 = true;
			}
		};
		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	update() {
		if (this.isGameLoaded1 && this.isGameLoaded2) {
			this.scene.stop("Preload");
			this.scene.start("Home");
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
