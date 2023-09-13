
// You can write more code here
let nScore = 0;
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// body
		const body = this.add.container(0, 0);

		// background
		const background = this.add.tileSprite(0, 543, 8216, 2191, "background");
		background.scaleX = 0.5;
		background.scaleY = 0.5;
		background.setOrigin(0, 0.5);
		body.add(background);

		// world_rect
		const world_rect = this.add.rectangle(960, 540, 1920, 1080);
		body.add(world_rect);

		// container_upperRings
		const container_upperRings = this.add.container(0, 0);
		body.add(container_upperRings);

		// container_ball
		const container_ball = this.add.container(0, 0);
		body.add(container_ball);

		// container_collider
		const container_collider = this.add.container(0, -1);
		body.add(container_collider);

		// container_lowerRings
		const container_lowerRings = this.add.container(0, 0);
		body.add(container_lowerRings);

		// scoreTxt
		const scoreTxt = this.add.text(960, 70, "", {});
		scoreTxt.setOrigin(0.5, 0.5);
		scoreTxt.setStyle({ "fontSize": "60px" });
		body.add(scoreTxt);

		this.background = background;
		this.world_rect = world_rect;
		this.container_upperRings = container_upperRings;
		this.container_ball = container_ball;
		this.container_collider = container_collider;
		this.container_lowerRings = container_lowerRings;
		this.scoreTxt = scoreTxt;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Rectangle} */
	world_rect;
	/** @type {Phaser.GameObjects.Container} */
	container_upperRings;
	/** @type {Phaser.GameObjects.Container} */
	container_ball;
	/** @type {Phaser.GameObjects.Container} */
	container_collider;
	/** @type {Phaser.GameObjects.Container} */
	container_lowerRings;
	/** @type {Phaser.GameObjects.Text} */
	scoreTxt;

	/* START-USER-CODE */

	// Write more your code here
	generateRing() {

		setInterval(() => {
			if (this.container_upperRings.list[this.container_upperRings.list.length - 1].x < 2000) {

				const nRandomX = Math.floor(Math.random() * (720 - 590)) + 590;
				const nRandomY = Math.floor(Math.random() * (778 - 272)) + 272;
				const uperRing = this.ringGroup.create(this.container_upperRings.list[this.container_upperRings.list.length - 1].x + nRandomX, nRandomY, "upperRing");
				uperRing.body.immovable = true;
				uperRing.body.setSize(20, 20);
				uperRing.body.setOffset(342, 255);
				this.container_upperRings.add(uperRing);

				const lowerRing = this.ringGroup.create(uperRing.x, uperRing.y + 30, "lowerRing");
				lowerRing.body.immovable = true;
				lowerRing.body.setSize(20, 20);
				lowerRing.body.setOffset(130, 225);
				this.container_lowerRings.add(lowerRing);

				const graphics = this.add.graphics();
				graphics.fillRect(0, 0, 150, 0.2);
				const rectTexture = graphics.generateTexture();
				const rectangle = this.colliderGroup.create(uperRing.x, uperRing.y + 40, rectTexture);
				rectangle.body.immovable = true;
				rectangle.body.setSize(180, 0.2);
				rectangle.body.setOffset(-80, 15);
				rectangle.setVisible(false);
				this.container_collider.add(rectangle);
			}
		}, 900);
	}
	handleBall(ball) {
		this.input.keyboard.createCursorKeys();
		this.input.keyboard.on("keydown", (event) => {
			if (event.code == "Space") {
				ball.body.setVelocityY(-2500);
			}
		}, this);

		this.input.on("pointerdown", () => {
			ball.body.setVelocityY(-2500);
			ball.angle -= 1;
		});
	}
	setParticle() {
		this.emitter = this.add.particles('lowerRing');
		this.emitter.createEmitter({
			speed: 1000,
			scale: { start: 1, end: 0 },
			gravityX: -10000,
			gravityY: 5000,
			blendMode: 'ADD',
			lifespan: { min: 500, max: 5000 },
		});
		this.emitter.setScale(0.1);
		setTimeout(() => {
			this.emitter.destroy();
		}, 300);
		this.emitter.setPosition(this.container_lowerRings.list[0].x, this.container_lowerRings.list[0].y);
	}
	create() {
		this.editorCreate();

		this.oTweenManager = new TweenManager(this);

		this.ballsGroup = this.physics.add.group();
		this.ringGroup = this.physics.add.group();
		this.colliderGroup = this.physics.add.group();

		const ball = this.ballsGroup.create(430, 460, "ball");
		ball.setCircle(ball.width / 2.7, 25, 25);
		ball.setScale(0.5, 0.5);
		ball.setName("ball");
		ball.setCollideWorldBounds();
		ball.weight = 3500;
		this.container_ball.add(ball);
		ball.body.setGravityY(5000);

		const nRandomX = Math.floor(Math.random() * (800 - 600)) + 600;
		const nRandomY = Math.floor(Math.random() * (778 - 272)) + 272;
		const uperRing = this.ringGroup.create(ball.x + nRandomX, nRandomY, "upperRing");
		uperRing.body.immovable = true;
		uperRing.body.setSize(20, 20);
		uperRing.body.setOffset(342, 255);
		this.container_upperRings.add(uperRing);

		const lowerRing = this.ringGroup.create(uperRing.x, uperRing.y + 30, "lowerRing");
		lowerRing.body.immovable = true;
		lowerRing.body.setSize(20, 20);
		lowerRing.body.setOffset(130, 225);
		this.container_lowerRings.add(lowerRing);

		const graphics = this.add.graphics();
		graphics.fillRect(0, 0, 150, 0.02);
		const rectTexture = graphics.generateTexture();
		const rectangle = this.colliderGroup.create(uperRing.x, uperRing.y + 40, rectTexture);
		rectangle.body.immovable = true;
		rectangle.body.setSize(180, 0.02);
		rectangle.body.setOffset(-80, 15);
		rectangle.setVisible(false);
		this.container_collider.add(rectangle);

		this.generateRing();
		this.handleBall(ball);

		this.scoreTxt.setText("Score: " + nScore);
		this.physics.add.collider(ball, this.ringGroup);
		this.ringCollider = this.physics.add.collider(ball, this.colliderGroup, (ball, collider) => {
			if (ball.y <= collider.y) {
				// this.setParticle();
				collider.body.checkCollision.up = false;
				collider.destroy();
				this.container_lowerRings.list[0].destroy();
				this.container_upperRings.list[0].destroy();
				nScore += 5;
				this.scoreTxt.setText("Score: " + nScore);
				const popUpText = this.add.text(ball.x, ball.y + 20, "+5");
				popUpText.setOrigin(0.5, 0.5);
				popUpText.setStyle({ "fontSize": "60px" });
				this.oTweenManager.popUPAnimation(popUpText);
			}
			else {
				if (collider.body.checkCollision.up) {
					const loseText = this.add.text(960, 540, "You Lose!");
					loseText.setOrigin(0.5, 0.5);
					loseText.setStyle({ "fontSize": "100px" });
					this.oTweenManager.popUPAnimation(loseText);
					this.scene.pause("Level");
				}
			}
		});
	}
	update() {
		this.ballsGroup.children.entries[0].angle += 2;
		this.background.tilePositionX += 9;
		this.container_collider.list.forEach((collider) => {
			collider.x -= 9;
			if (collider.x < this.container_ball.list[0].x - 200) {
				const loseText = this.add.text(960, 540, "You Lose!");
				loseText.setOrigin(0.5, 0.5);
				loseText.setStyle({ "fontSize": "100px" });
				this.oTweenManager.popUPAnimation(loseText);
				this.scene.pause("Level");
			}
			if (collider.x < -128) {
				collider.destroy();
			}
		});
		this.container_lowerRings.list.forEach((ring) => {
			ring.x -= 9;
			if (ring.x < -128) {
				ring.destroy();
			}
		});
		this.container_upperRings.list.forEach((ring) => {
			ring.x -= 9;
			if (ring.x < -128) {
				ring.destroy();
			}
		})
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
