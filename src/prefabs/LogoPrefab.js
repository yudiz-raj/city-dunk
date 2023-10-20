
// You can write more code here

/* START OF COMPILED CODE */

class LogoPrefab extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// logo_ring2
		const logo_ring2 = scene.add.image(77, 73, "logo-ring2");
		this.add(logo_ring2);

		// logo_1
		const logo_1 = scene.add.image(0, 0, "logo-1");
		this.add(logo_1);

		// logo_ring
		const logo_ring = scene.add.image(95, 124, "logo-ring");
		this.add(logo_ring);

		// swing_img
		const swing_img = scene.add.image(-297, -284, "swing-img");
		swing_img.visible = false;
		this.add(swing_img);

		// ball
		const ball = scene.add.image(-504, -400, "ball");
		ball.visible = false;
		this.add(ball);

		this.swing_img = swing_img;
		this.ball = ball;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	swing_img;
	/** @type {Phaser.GameObjects.Image} */
	ball;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
