class SoundManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.backgroundMusic = this.oScene.sound.add("background-music");
        this.clickSound = this.oScene.sound.add("click-sound").setVolume(7);
        this.ballCollisionSound = this.oScene.sound.add("ballCollision-sound");
        this.ballPassFromRingSound = this.oScene.sound.add("ballPassFromRing-sound");
        this.gameOverSound = this.oScene.sound.add("gameOver-sound");
    }
    playSound(key, loop) {
        key.play();
        key.loop = loop;
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }
}