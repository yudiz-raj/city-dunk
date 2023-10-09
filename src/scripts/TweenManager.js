class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
    }
    ballAnimation() {
        this.oScene.tweens.add({
            targets: this.oScene.ballsGroup.children.entries[0],
            angle: '+=360',
            duration: 1000,
            repeat: -1
        });
    }

    popUPAnimation(target) {
        this.oScene.tweens.add({
            targets: target,
            scaleX: 2,
            scaleY: 2,
            duration: 300,
            ease: "Power2",
            yoyo: true,
            onComplete: () => {
                target.destroy();
            }
        });
    }

    buttonAnimation(target) {
        this.oScene.tweens.add({
            targets: target,
            scaleX: 0.4,
            scaleY: 0.4,
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