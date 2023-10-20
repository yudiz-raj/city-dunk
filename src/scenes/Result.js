
// You can write more code here

/* START OF COMPILED CODE */

class Result extends Phaser.Scene {

	constructor() {
		super("Result");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// body
		const body = this.add.container(0, -1);

		// background
		const background = this.add.image(960, 540, "background");
		body.add(background);

		// score_board
		const score_board = this.add.image(960, 540, "score-board");
		score_board.scaleX = 0.9;
		score_board.scaleY = 0.9;
		body.add(score_board);

		// best_text
		const best_text = this.add.image(960, 650, "best-text");
		best_text.scaleX = 0.9;
		best_text.scaleY = 0.9;
		body.add(best_text);

		// score_text
		const score_text = this.add.image(960, 433, "score-text");
		score_text.scaleX = 0.9;
		score_text.scaleY = 0.9;
		body.add(score_text);

		// score
		const score = this.add.text(960, 526, "", {});
		score.setOrigin(0.5, 0.5);
		score.setStyle({ "color": "#FFCB4F", "fontFamily": "Skia", "fontSize": "66px" });
		body.add(score);

		// best_score
		const best_score = this.add.text(960, 742, "", {});
		best_score.setOrigin(0.5, 0.5);
		best_score.setStyle({ "color": "#FFCB4F", "fontFamily": "Skia", "fontSize": "66px" });
		body.add(best_score);

		// replay_button
		const replay_button = this.add.image(1080, 987, "replay-button");
		replay_button.setInteractive(new Phaser.Geom.Circle(140, 120, 120), Phaser.Geom.Circle.Contains);
		replay_button.scaleX = 0.5;
		replay_button.scaleY = 0.5;
		body.add(replay_button);

		// home_button
		const home_button = this.add.image(840, 987, "home-button");
		home_button.scaleX = 1.3;
		home_button.scaleY = 1.3;
		body.add(home_button);

		this.background = background;
		this.score_board = score_board;
		this.best_text = best_text;
		this.score_text = score_text;
		this.score = score;
		this.best_score = best_score;
		this.replay_button = replay_button;
		this.home_button = home_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	score_board;
	/** @type {Phaser.GameObjects.Image} */
	best_text;
	/** @type {Phaser.GameObjects.Image} */
	score_text;
	/** @type {Phaser.GameObjects.Text} */
	score;
	/** @type {Phaser.GameObjects.Text} */
	best_score;
	/** @type {Phaser.GameObjects.Image} */
	replay_button;
	/** @type {Phaser.GameObjects.Image} */
	home_button;

	/* START-USER-CODE */

	// Write your code here
	create() {

		this.editorCreate();
		this.oTweenManager = new TweenManager(this);
		if (window.innerWidth < 1050) {
			this.background.setX(360);
			this.replay_button.setX(360);
			this.score_board.setX(360).setScale(0.7, 0.7);
			this.score_text.setX(360).setScale(0.7, 0.7);
			this.score.setPosition(360, 513);
			this.best_text.setPosition(360, 613).setScale(0.7, 0.7);
			this.best_score.setPosition(360, 693);
		}

		this.score.setText(localStorage.getItem('currentScore'));
		this.best_score.setText(localStorage.getItem('circusSlamBestScore'));

		this.oTweenManager.buttonAnimation(this.replay_button);
		this.replay_button.setInteractive();
		this.replay_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.replay_button.setScale(0.53, 0.53);
		});
		this.replay_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.replay_button.setScale(0.5, 0.5);
		});
		this.replay_button.on("pointerdown", () => {
			this.input.setDefaultCursor("default");
			this.oTweenManager.clickAnimation(this.replay_button);
		});

		this.oTweenManager.buttonAnimation(this.home_button);
		this.home_button.setInteractive();
		this.home_button.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			this.home_button.setScale(1.33, 1.33);
		});
		this.home_button.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			this.home_button.setScale(1.3, 1.3);
		});
		this.home_button.on("pointerdown", () => {
			this.input.setDefaultCursor("default");
			this.oTweenManager.clickAnimation(this.home_button);
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
