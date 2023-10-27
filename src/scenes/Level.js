// You can write more code here
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

		// rectangle
		/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.StaticBody }} */
		const rectangle = this.add.rectangle(967, 1080, 1920, 0);
		this.physics.add.existing(rectangle, true);
		rectangle.body.immovable = true;
		rectangle.body.setOffset(0, 30);
		rectangle.body.setSize(1920, 0, false);
		rectangle.isFilled = true;
		body.add(rectangle);

		// background
		const background = this.add.tileSprite(0, 540, 3754, 1088, "background");
		background.setOrigin(0, 0.5);
		body.add(background);

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
		const scoreTxt = this.add.text(847, 33, "", {});
		scoreTxt.setOrigin(0, 0.5);
		scoreTxt.text = "Score: 00";
		scoreTxt.setStyle({ "color": "#FFA3DC", "fontFamily": "Skia", "fontSize": "40px" });
		body.add(scoreTxt);

		// first_click
		const first_click = this.add.image(960, 735, "first-click");
		first_click.scaleX = 0.8;
		first_click.scaleY = 0.8;
		body.add(first_click);

		// home_button
		const home_button = this.add.image(100, 100, "home-button");
		home_button.setInteractive(new Phaser.Geom.Circle(140, 120, 120), Phaser.Geom.Circle.Contains);
		home_button.scaleX = 0.5;
		home_button.scaleY = 0.5;
		body.add(home_button);

		// pause_button
		const pause_button = this.add.image(1820, 100, "pause-button");
		pause_button.setInteractive(new Phaser.Geom.Circle(140, 120, 120), Phaser.Geom.Circle.Contains);
		pause_button.scaleX = 0.5;
		pause_button.scaleY = 0.5;
		body.add(pause_button);

		this.rectangle = rectangle;
		this.background = background;
		this.container_upperRings = container_upperRings;
		this.container_ball = container_ball;
		this.container_collider = container_collider;
		this.container_lowerRings = container_lowerRings;
		this.score_bar = score_bar;
		this.scoreTxt = scoreTxt;
		this.first_click = first_click;
		this.home_button = home_button;
		this.pause_button = pause_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.StaticBody }} */
	rectangle;
	/** @type {Phaser.GameObjects.TileSprite} */
	background;
	/** @type {Phaser.GameObjects.Container} */
	container_upperRings;
	/** @type {Phaser.GameObjects.Container} */
	container_ball;
	/** @type {Phaser.GameObjects.Container} */
	container_collider;
	/** @type {Phaser.GameObjects.Container} */
	container_lowerRings;
	/** @type {Phaser.GameObjects.Image} */
	score_bar;
	/** @type {Phaser.GameObjects.Text} */
	scoreTxt;
	/** @type {Phaser.GameObjects.Image} */
	first_click;
	/** @type {Phaser.GameObjects.Image} */
	home_button;
	/** @type {Phaser.GameObjects.Image} */
	pause_button;

	/* START-USER-CODE */

	// Write more your code here
	setConfetti() {
		confetti({
			particleCount: 300,
			spread: 100,
			origin: { y: 0.8 },
		  });
	}
	generateRing() {
		this.interval = setInterval(() => {
			if (this.container_upperRings.list[this.container_upperRings.list.length - 1].x < 2000) {
				this.createRing();
			}
		}, 100);
	}
	handleBall(ball) {
		this.input.keyboard.createCursorKeys();
		this.input.keyboard.on("keydown", (event) => {
			if (event.code == "Space") {
				if (this.enableEffect) {
					ball.body.setVelocityY(-1500);
				}
			}
		}, this);

		this.input.on("pointerdown", () => {
			if (this.enableEffect) {
				ball.body.setVelocityY(-1500);
				ball.angle -= 1;
			}
		});
	}
	checkResult() {
		clearInterval(this.interval);
		if ((localStorage.getItem('circusSlamBestScore')) <= Number(this.nScore)) {
			localStorage.setItem('circusSlamBestScore', Number(this.nScore));
			this.setConfetti();
		}
		else {
			localStorage.setItem('circusSlamBestScore', Number(localStorage.getItem('circusSlamBestScore')));
		}
		this.scene.stop("Level");
		this.scene.start("Result");
	}
	create() {
		this.editorCreate();
		this.gameStart = false;
		this.index = 0;
		if (window.innerWidth < 1050) {
			this.score_bar.setX(360);
			this.scoreTxt.setX(247);
			this.first_click.setX(360);
			this.rectangle.setW(720).setX(360);
		}
		this.oTweenManager = new TweenManager(this);
		this.nScore = 0;
		localStorage.setItem('currentScore', 0);

		this.pause_button.setInteractive()
		this.pause_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.pause_button.setScale(0.53, 0.53);
		});
		this.pause_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.pause_button.setScale(0.5, 0.5);
		});
		this.pause_button.on("pointerdown", () => {
			this.input.setDefaultCursor("default");
			if (this.gameStart) {
				this.enableEffect = false;
				this.pause_button.setTexture("play-button");
				this.gameStart = false;
				ball.body.setVelocityY(0);
				ball.body.setGravityY(0);
				this.oTweenManager.ballRotationTween.stop();
			}
			else {
				this.pause_button.setTexture("pause-button");
				this.gameStart = true;
				ball.body.setGravityY(3500);
				this.oTweenManager.ballAnimation();
				this.enableEffect = true;
			}
		});
		this.home_button.setInteractive()
		this.home_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.home_button.setScale(0.53, 0.53);
		});
		this.home_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.home_button.setScale(0.5, 0.5);
		});
		this.home_button.on("pointerdown", () => {
			this.input.setDefaultCursor("default");
			this.oTweenManager.clickAnimation(this.home_button);
		});

		this.ballsGroup = this.physics.add.group();
		this.ringGroup = this.physics.add.group();
		this.colliderGroup = this.physics.add.group();

		const ball = this.ballsGroup.create(400, 460, "ball");
		ball.setCircle(ball.width / 2.2, 5, 5);
		ball.setScale(0.8, 0.8);
		ball.setName("ball");
		ball.setCollideWorldBounds();
		ball.weight = 3500;
		this.container_ball.add(ball);
		this.oTweenManager.instructionAnimation();
		this.input.once("pointerdown", () => {
			this.gameStart = true;
			this.enableEffect = true;
			ball.body.setGravityY(3500);
			this.oTweenManager.ballAnimation();
			this.oTweenManager.ballTween.stop();
			this.oTweenManager.clickTween.stop();
			this.first_click.destroy();
		});
		this.generateRing();
		this.createRing();
		this.handleBall(ball);

		this.scoreTxt.setText("Score: " + `0${this.nScore}`);
		this.physics.add.collider(ball, this.ringGroup, (ball, ring) => {
			ball.y < ring.body.y - 100 ? ball.body.setVelocityY(-300) : ball.body.setVelocityY(200);
		});
		this.physics.add.overlap(ball, this.colliderGroup, (ball, collider) => {
			if (ball.y <= collider.y) {
				collider.body.checkCollision.up = false;
				collider.destroy();
				this.container_lowerRings.list[this.index].setTexture("grey-lower");
				this.container_upperRings.list[this.index].setTexture("grey-upper");
				this.container_lowerRings.list[this.index].y += 6;
				this.index++;
				const popUpText = this.add.text(ball.x, ball.y + 20, `+${collider.name}`);
				popUpText.setOrigin(0.5, 0.5);
				popUpText.setStyle({ "fontFamily": "Skia", "fontSize": "30px" });
				this.nScore += +collider.name;
				localStorage.setItem('currentScore', this.nScore);
				this.nScore < 10 ? this.scoreTxt.setText("Score: " + `0${this.nScore}`) : this.scoreTxt.setText("Score: " + this.nScore);
				this.oTweenManager.popUPAnimation(popUpText);
			}
			else {
				if (collider.body.checkCollision.up) {
					this.checkResult();
				}
			}
		});
		this.physics.add.collider(ball, this.rectangle, () => {
			this.checkResult();
		});
	}
	createRing() {
		const nRandomX = Math.floor(Math.random() * (720 - 590)) + 590;
		const nRandomY = Math.floor(Math.random() * (778 - 272)) + 272;
		const nRandomAngle = Phaser.Math.Between(0, 2);
		this.container_upperRings.list.length <= 0 ?
			this.ringX = this.container_ball.list[0].x + 400 :
			this.ringX = this.container_upperRings.list[this.container_upperRings.list.length - 1].x;
		const uperRing = this.ringGroup.create(this.ringX + nRandomX, nRandomY, "upperRing").setAngle(aAngle[nRandomAngle]);
		if (nRandomAngle == 0) {
			this.nOffsetY = 0;
			this.x = uperRing.x;
			this.y = uperRing.y + 43.5;
			this.ringValue = 1;
		}
		if (nRandomAngle == 1) {
			this.nOffsetY = 15;
			this.x = uperRing.x + 7;
			this.y = uperRing.y + 42.5;
			this.ringValue = 5;
		}
		if (nRandomAngle == 2) {
			this.nOffsetY = -15;
			this.x = uperRing.x - 8;
			this.y = uperRing.y + 42.5;
			this.ringValue = 10;
		}
		uperRing.body.immovable = true;
		uperRing.setCircle(15, 205, 50 - this.nOffsetY);
		this.container_upperRings.add(uperRing);

		const lowerRing = this.ringGroup.create(this.x, this.y, "lowerRing").setAngle(aAngle[nRandomAngle]);
		lowerRing.body.immovable = true;
		lowerRing.setCircle(15, 10, 5 + this.nOffsetY);
		this.container_lowerRings.add(lowerRing);

		const graphics = this.add.graphics();
		graphics.fillRect(0, 0, 150, 0.2);
		const rectTexture = graphics.generateTexture();
		const rectangle = this.colliderGroup.create(uperRing.x, uperRing.y + 40, rectTexture).setName(`${this.ringValue}`);
		rectangle.body.immovable = true;
		rectangle.body.setSize(180, 0.2);
		rectangle.body.setOffset(-80, 15);
		rectangle.setVisible(false);
		this.container_collider.add(rectangle);
	}
	update() {
		if (this.gameStart) {
			this.background.tilePositionX += 4;
			// if (!this.container_ball.list[0].body.blocked.none) {
			// 	this.checkResult();
			// }
			this.container_collider.list.forEach((collider) => {
				collider.x -= 4;
				if (collider.x < this.container_ball.list[0].x - 200) {
					this.checkResult();
				}
			});
			this.container_lowerRings.list.forEach((ring) => {
				ring.x -= 4;
			});
			this.container_upperRings.list.forEach((ring) => {
				ring.x -= 4;
			});
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */
// You can write more code here