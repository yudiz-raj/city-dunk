
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

		// rectangle
		/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.StaticBody }} */
		const rectangle = this.add.rectangle(960, 1010, 128, 140);
		this.physics.add.existing(rectangle, true);
		rectangle.body.setSize(128, 140, false);
		rectangle.isFilled = true;

		// background
		const background = this.add.image(0, 540, "background");
		background.setOrigin(0, 0.5);

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 489);
		this.add.existing(logoPrefab);

		// play_button
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const play_button = this.add.image(960, -82, "start-button");
		play_button.setInteractive(new Phaser.Geom.Circle(80, 80, 70), Phaser.Geom.Circle.Contains);
		this.physics.add.existing(play_button, false);
		play_button.body.setCircle(64);

		this.rectangle = rectangle;
		this.logoPrefab = logoPrefab;
		this.play_button = play_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.StaticBody }} */
	rectangle;
	/** @type {LogoPrefab} */
	logoPrefab;
	/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
	play_button;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.oTweenManager = new TweenManager(this);
		this.logoPrefab.ball.setVisible(true);
		this.logoPrefab.swing_img.setVisible(true);
		this.play_button.body.setGravityY(2000).setBounce(0.5);
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
		this.physics.add.collider(this.play_button, this.rectangle, ()=>{
			this.play_button.body.setBounce(0.5);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
