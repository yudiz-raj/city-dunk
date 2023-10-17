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
            targets: mask,
            x: 454,
            duration: 1300,
        });
    }
    ballAnimation() {
        this.oScene.tweens.add({
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
        this.oScene.tweens.add({
            targets: target,
            scaleX: "-=0.1",
            scaleY: "-=0.1",
            duration: 200,
            ease: "elsatic",
            yoyo: true,
            onComplete: () => {
                if (target.texture.key == "play-button") {
                    this.oScene.scene.stop("Home");
                    this.oScene.scene.start("Level");
                }
                else {
                    this.oScene.scene.stop("Result");
                    this.oScene.scene.start("Level");
                }
            }
        });

    }
}