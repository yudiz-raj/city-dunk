
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
		const replay_button = this.add.image(960, 987, "replay-button");
		replay_button.scaleX = 0.5;
		replay_button.scaleY = 0.5;
		body.add(replay_button);

		this.score = score;
		this.best_score = best_score;
		this.replay_button = replay_button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	score;
	/** @type {Phaser.GameObjects.Text} */
	best_score;
	/** @type {Phaser.GameObjects.Image} */
	replay_button;

	/* START-USER-CODE */

	// Write your code here
	create() {

		this.editorCreate();
		this.oTweenManager = new TweenManager(this);

		this.score.setText(localStorage.getItem('currentScore'));
		this.best_score.setText(localStorage.getItem('bestScore'));

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
		})
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
