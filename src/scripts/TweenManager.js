class TweenManager {
    constructor(oScene) {
        this.oScene = oScene;
    }

    popUPAnimation(target){
        console.log(target);
        this.oScene.add.tween({
            targets: target,
            scaleX: 2,
            scaleY: 2,
            duration: 300,
            ease: "Power2",
            // yoyo: true,
            onComplete: () => {
                target.destroy();
            }
        });
    }
}