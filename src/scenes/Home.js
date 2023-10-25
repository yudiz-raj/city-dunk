
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
		const background = this.add.image(0, 540, "background");
		background.setOrigin(0, 0.5);

		// play_button
		const play_button = this.add.image(960, 870, "start-button");
		play_button.setInteractive(new Phaser.Geom.Circle(80, 80, 70), Phaser.Geom.Circle.Contains);

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 489);
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
		this.logoPrefab.ball.setVisible(true);
		this.logoPrefab.swing_img.setVisible(true);
		let shape = this.make.graphics();
		if (window.innerWidth < 1050) {
			this.logoPrefab.setScale(0.7, 0.7).setPosition(360, 350);
			this.play_button.setX(360);
			shape.fillRect(-450, 0, 400, 400);
		}
		else {
			shape.fillRect(0, 0, 500, 500);
		}
		const mask = shape.createGeometryMask();
		this.logoPrefab.swing_img.setMask(mask);
		this.oTweenManager.logoAnimation(mask.geometryMask);
		this.oTweenManager.buttonAnimation(this.play_button);
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
