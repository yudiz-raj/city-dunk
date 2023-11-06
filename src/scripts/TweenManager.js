class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    logoAnimation(mask) {
        this.oScene.tweens.add({
            targets: this.oScene.logoPrefab.ball,
            x: -98,
            y: -213,
            angle: '+=360',
            duration: 1000,
            onComplete: () => {
                this.oScene.tweens.add({
                    targets: this.oScene.logoPrefab.ball,
                    x: 302,
                    angle: '+=360',
                    duration: 1000,
                });
                this.oScene.tweens.add({
                    targets: this.oScene.logoPrefab.swing_img,
                    alpha: 0,
                    duration: 200,
                    ease: "static",
                });
            }
        });
        this.oScene.tweens.add({
            targets: this.oScene.logoPrefab.shadow,
            alpha: 0,
            ease: "static.easeOut",
            duration: 500,
            delay: 0,
            yoyo: true,
            repeat: -1,
        });
        this.oScene.tweens.add({
            targets: mask,
            x: 454,
            duration: 1300,
        });
        this.oScene.tweens.add({
            targets: this.oScene.play_button,
            y: 870,
            ease: "bounce",
            duration: 1300,
        });
    }
    instructionAnimation() {
        this.ballTween = this.oScene.tweens.add({
            targets: this.oScene.ballsGroup.children.entries[0],
            y: '-=100',
            ease: 'power2',
            duration: 700,
            delay: 0,
            yoyo: true,
            repeat: -1
        });
        this.clickTween = this.oScene.tweens.add({
            targets: this.oScene.first_click,
            duration: 700,
            ease: 'Linear',
            delay: 0,
            scaleX: 0.8,
            repeat: -1,
            yoyo: true,
            onYoyo: () => {
                this.oScene.first_click.setTexture('second-click');
            },
            onRepeat: () => {
                this.oScene.first_click.setTexture('first-click');
            },
        });
    }
    ballAnimation() {
        this.ballRotationTween = this.oScene.tweens.add({
            targets: this.oScene.ballsGroup.children.entries[0],
            angle: '+=360',
            duration: 1000,
            repeat: -1
        });
    }
    buttonAnimation(target) {
        this.oScene.tweens.add({
            targets: target,
            scaleX: "+=0.05",
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }
    popUPAnimation(target) {
        this.oScene.tweens.add({
            targets: target,
            y: "-=200",
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 1200,
            ease: "Power3",
            onComplete: () => {
                target.destroy();
            }
        });
    }
    clickAnimation(target) {
        target.disableInteractive();
        this.oScene.tweens.add({
            targets: target,
            scaleX: "-=0.1",
            scaleY: "-=0.1",
            duration: 200,
            ease: "elsatic",
            yoyo: true,
            onComplete: () => {
                if (target.texture.key == "start-button") {
                    this.oScene.oSoundManager.stopSound(this.oScene.oSoundManager.backgroundMusic, false);
                    this.oScene.tweens.add({
                        targets: this.oScene.play_button,
                        y: 1200,
                        duration: 500,
                        onComplete: () => {
                            this.oScene.scene.stop("Home");
                            this.oScene.scene.start("Level");
                        }
                    });
                }
                if (target.texture.key == "replay-button") {
                    this.oScene.oSoundManager.stopSound(this.oScene.oSoundManager.backgroundMusic, false);
                    this.oScene.scene.stop("Result");
                    this.oScene.scene.start("Level");
                }
                if (target.texture.key == "home-button") {
                    this.oScene.oSoundManager.stopSound(this.oScene.oSoundManager.backgroundMusic, false);
                    this.oScene.scene.stop();
                    this.oScene.scene.start("Home");
                }
                target.setInteractive();
            }
        });
    }
    resultAnimation() {
        this.oScene.tweens.add({
            targets: [this.oScene.container_buttons, this.oScene.container_scoreBoard],
            y: 0,
            ease: "bounce",
            duration: 1300,
        });
    }
}