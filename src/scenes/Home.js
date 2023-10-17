
// You can write more code here

/* START OF COMPILED CODE */

class Home extends Phaser.Scene {

	constructor() {
		super("Home");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(1900, 540, "background");

		// play_button
		const play_button = this.add.image(960, 870, "play-button");

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 479);
		this.add.existing(logoPrefab);

		this.play_button = play_button;
		this.logoPrefab = logoPrefab;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {LogoPrefab} */
	logoPrefab;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.oTweenManager = new TweenManager(this);
		let shape = this.make.graphics();
		shape.fillRect(0, 0, 500, 500);
		const mask = shape.createGeometryMask();
		this.logoPrefab.swing_img.setMask(mask);
		this.oTweenManager.buttonAnimation(this.play_button);
		this.oTweenManager.logoAnimation(mask.geometryMask);
		this.play_button.setInteractive();
		this.play_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.play_button.setScale(1.09, 1.09);
		});
		this.play_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.play_button.setScale(1, 1);
		});
		this.play_button.on("pointerdown", () => {
			this.input.setDefaultCursor("default");
			this.oTweenManager.clickAnimation(this.play_button);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
