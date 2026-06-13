let sizes = {
    width: 800,
    height: 600
}
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
     physics: {
         default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {

}

function create() {
    this.square = this.add.rectangle(400, 300, 70, 70, 0x00ff00);
    this.physics.add.existing(this.square);
    this.square.body.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    let groundLevel = window.innerHeight - 35;
    if (!this.square.body.blocked.down) {
        console.log("The square is on the ground!");
        return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.square.body.setVelocityY(-250);
        this.tweens.add({
            targets: this.square,
            angle: 360,
            duration: 4000,
            ease: 'Linear',
            repeat: 1
        });
    }
}