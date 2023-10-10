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
    buttonAnimation(target) {
        this.oScene.tweens.add({
            targets: target,
            scaleX: 0.55,
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