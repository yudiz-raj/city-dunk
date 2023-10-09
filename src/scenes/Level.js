// You can write more code here
let nBestScore = 0;
let aAngle = [0, -10, 10];
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
		const background = this.add.tileSprite(0, 540, 3800, 1100, "background");
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

		// score_bar
		const score_bar = this.add.image(960, 37, "score-bar");
		body.add(score_bar);

		// scoreTxt
		const scoreTxt = this.add.text(826, 33, "", {});
		scoreTxt.setOrigin(0, 0.5);
		scoreTxt.setStyle({ "color": "#FFA3DC", "fontFamily": "Skia", "fontSize": "48px" });
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

		this.interval = setInterval(() => {
			if (this.container_upperRings.list[this.container_upperRings.list.length - 1].x < 2000) {

				const nRandomX = Math.floor(Math.random() * (720 - 590)) + 590;
				const nRandomY = Math.floor(Math.random() * (778 - 272)) + 272;
				const nRandomAngle = Phaser.Math.Between(0, 2);
				const uperRing = this.ringGroup.create(this.container_upperRings.list[this.container_upperRings.list.length - 1].x + nRandomX, nRandomY, "upperRing").setAngle(aAngle[nRandomAngle]);
				if (nRandomAngle == 0) {
					this.nOffsetY = 0;
					this.x = uperRing.x;
					this.y = uperRing.y + 43.5;
				}
				if (nRandomAngle == 1) {
					this.nOffsetY = 20;
					this.x = uperRing.x + 7;
					this.y = uperRing.y + 42.5;
				}
				if (nRandomAngle == 2) {
					this.nOffsetY = -20;
					this.x = uperRing.x - 8;
					this.y = uperRing.y + 42.5;
				}
				uperRing.body.immovable = true;
				uperRing.body.setSize(20, 20);
				uperRing.body.setOffset(210, 50 - this.nOffsetY);
				this.container_upperRings.add(uperRing);

				const lowerRing = this.ringGroup.create(this.x, this.y, "lowerRing").setAngle(aAngle[nRandomAngle]);
				lowerRing.body.immovable = true;
				lowerRing.body.setSize(20, 20);
				lowerRing.body.setOffset(12, 10 + this.nOffsetY);
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
				ball.body.setVelocityY(-1500);
			}
		}, this);

		this.input.on("pointerdown", () => {
			ball.body.setVelocityY(-1500);
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
		this.nScore = 0;

		this.ballsGroup = this.physics.add.group();
		this.ringGroup = this.physics.add.group();
		this.colliderGroup = this.physics.add.group();

		const ball = this.ballsGroup.create(430, 460, "ball");
		ball.setCircle(ball.width / 2.1, 3, 3);
		ball.setScale(0.8, 0.8);
		ball.setName("ball");
		ball.setCollideWorldBounds();
		ball.weight = 3500;
		this.container_ball.add(ball);
		ball.body.setGravityY(3000);
		this.oTweenManager.ballAnimation();

		const nRandomX = Math.floor(Math.random() * (800 - 600)) + 600;
		const nRandomY = Math.floor(Math.random() * (778 - 272)) + 272;
		const nRandomAngle = Phaser.Math.Between(0, 2);

		const uperRing = this.ringGroup.create(ball.x + nRandomX, nRandomY, "upperRing").setAngle(aAngle[nRandomAngle]);
		if (nRandomAngle == 0) {
			this.nOffsetY = 0;
			this.x = uperRing.x;
			this.y = uperRing.y + 43.5;
		}
		if (nRandomAngle == 1) {
			this.nOffsetY = 20;
			this.x = uperRing.x + 7;
			this.y = uperRing.y + 42.5;
		}
		if (nRandomAngle == 2) {
			this.nOffsetY = -20;
			this.x = uperRing.x - 8;
			this.y = uperRing.y + 42.5;
		}
		uperRing.body.immovable = true;
		uperRing.body.setSize(20, 20);
		uperRing.body.setOffset(210, 50 - this.nOffsetY);
		this.container_upperRings.add(uperRing);

		const lowerRing = this.ringGroup.create(this.x, this.y, "lowerRing").setAngle(aAngle[nRandomAngle]);
		lowerRing.body.immovable = true;
		lowerRing.body.setSize(25, 20);
		lowerRing.body.setOffset(12, 10 + this.nOffsetY);
		this.container_lowerRings.add(lowerRing);

		const graphics = this.add.graphics();
		graphics.fillRect(0, 0, 150, 0.02);
		const rectTexture = graphics.generateTexture();
		const rectangle = this.colliderGroup.create(uperRing.x, uperRing.y + 40, rectTexture).setAngle(aAngle[nRandomAngle]);
		rectangle.body.immovable = true;
		rectangle.body.setSize(180, 0.02);
		rectangle.body.setOffset(-80, 15);
		rectangle.setVisible(false);
		this.container_collider.add(rectangle);

		this.generateRing();
		this.handleBall(ball);

		this.scoreTxt.setText("Score: " + `0${this.nScore}`);
		this.physics.add.collider(ball, this.ringGroup);
		this.ringCollider = this.physics.add.overlap(ball, this.colliderGroup, (ball, collider) => {
			if (ball.y <= collider.y) {
				// this.setParticle();
				collider.body.checkCollision.up = false;
				collider.destroy();
				this.container_lowerRings.list[0].setTexture("grey-lower");
				this.container_upperRings.list[0].setTexture("grey-upper");
				this.container_lowerRings.list[0].y += 6;
				this.nScore += 5;
				this.nScore < 10 ? this.scoreTxt.setText("Score: " + `0${this.nScore}`) : this.scoreTxt.setText("Score: " + this.nScore);

				const popUpText = this.add.text(ball.x, ball.y + 20, "+5");
				popUpText.setOrigin(0.5, 0.5);
				popUpText.setStyle({ "fontFamily": "Skia", "fontSize": "30px" });
				this.oTweenManager.popUPAnimation(popUpText);
			}
			else {
				if (collider.body.checkCollision.up) {
					clearInterval(this.interval);
					if (nBestScore < this.nScore) {
						nBestScore = this.nScore;
					}
					let nScore = this.nScore;
					this.scene.stop("Level");
					this.scene.start("Result", { nScore, nBestScore });
				}
			}
		});
	}
	update() {
		this.background.tilePositionX += 5;
		this.container_collider.list.forEach((collider) => {
			collider.x -= 5;
			if (collider.x < this.container_ball.list[0].x - 200) {
				clearInterval(this.interval);
				if (nBestScore < this.nScore) {
					nBestScore = this.nScore;
				}
				let nScore = this.nScore;
				this.scene.stop("Level");
				this.scene.start("Result", { nScore, nBestScore });
			}
			if (collider.x < -90) {
				collider.destroy();
			}
		});
		this.container_lowerRings.list.forEach((ring) => {
			ring.x -= 5;
			if (ring.x < -90) {
				ring.destroy();
			}
		});
		this.container_upperRings.list.forEach((ring) => {
			ring.x -= 5;
			if (ring.x < -90) {
				ring.destroy();
			}
		})
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
