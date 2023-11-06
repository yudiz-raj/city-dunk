
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

		// logoPrefab
		const logoPrefab = new LogoPrefab(this, 960, 489);
		this.add.existing(logoPrefab);

		// play_button
		const play_button = this.add.image(960, -82, "start-button");
		play_button.setInteractive(new Phaser.Geom.Circle(80, 80, 70), Phaser.Geom.Circle.Contains);

		this.logoPrefab = logoPrefab;
		this.play_button = play_button;

		this.events.emit("scene-awake");
	}

	/** @type {LogoPrefab} */
	logoPrefab;
	/** @type {Phaser.GameObjects.Image} */
	play_button;

	/* START-USER-CODE */

	// Write your code here
	setAudio() {
		const isMusicOn = (flag) => {
			// flag ? this.music_button.setTexture("music-on-button") : this.music_button.setTexture("music-off-button");
			localStorage.setItem("isCircusSlamMusicOn", flag);
			this.oSoundManager.backgroundMusic.setMute(!flag);
			this.oSoundManager.playSound(this.oSoundManager.backgroundMusic, true);
		}
		const isSoundOn = (flag) => {
			// flag ? this.sound_button.setTexture("sound-on-button") : this.sound_button.setTexture("sound-off-button");
			localStorage.setItem('isCircusSlamSoundOn', flag);
			this.oSoundManager.clickSound.setMute(!flag);
			this.oSoundManager.ballCollisionSound.setMute(!flag);
			this.oSoundManager.ballPassFromRingSound.setMute(!flag);
			this.oSoundManager.gameOverSound.setMute(!flag);
		}
		// this.sound_button.setInteractive().on('pointerdown', () => {
		// 	this.oSoundManager.playSound(this.oSoundManager.clickSound, false);
		// 	isSoundOn(!JSON.parse(localStorage.getItem("isCircusSlamSoundOn")));
		// });
		// this.music_button.setInteractive().on('pointerdown', () => {
		// 	this.oSoundManager.playSound(this.oSoundManager.clickSound, false);
		// 	isMusicOn(!JSON.parse(localStorage.getItem("isCircusSlamMusicOn")));
		// });
		isMusicOn(JSON.parse(localStorage.getItem("isCircusSlamMusicOn")));
		isSoundOn(JSON.parse(localStorage.getItem("isCircusSlamSoundOn")));
	}

	create() {

		this.editorCreate();
		this.oTweenManager = new TweenManager(this);
		this.oSoundManager = new SoundManager(this);

		this.setAudio();
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
			this.oSoundManager.playSound(this.oSoundManager.clickSound, false);
			this.oTweenManager.clickAnimation(this.play_button);
		});
		this.physics.add.collider(this.play_button, this.rectangle, ()=>{
			this.play_button.body.setBounce(0.5);
			this.oSoundManager.playSound(this.oSoundManager.ballCollisionSound, false);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
