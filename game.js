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
            gravity: { y: 600 },
            debug: true
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
    this.background = this.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'yourBackgroundKey');
    this.background.setOrigin(0, 0);
    this.dead = false;
    //spike
    this.spikeTexture = this.make.graphics({ x: 0, y: 0, add: false });
    this.spikeTexture.fillStyle(0xff2a6d, 1);
    this.spikeTexture.lineStyle(2, 0xffffff, 1);
    this.spikeTexture.beginPath();
    this.spikeTexture.moveTo(30, 0);
    this.spikeTexture.lineTo(60, 60);
    this.spikeTexture.lineTo(0, 60);
    this.spikeTexture.closePath();
    this.spikeTexture.fillPath();
    this.spikeTexture.strokePath();
    this.spikeTexture.generateTexture('spike', 60, 60);
    //end
    //player
    this.square = this.add.rectangle(400, 300, 60, 60, 0x00ff00);
    this.physics.add.existing(this.square);
    this.square.body.setCollideWorldBounds(true);
    //end
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    let groundLevel = window.innerHeight - 30;
    let middle = window.innerWidth / 2;
    this.spike = this.physics.add.sprite(middle + 200, window.innerHeight - 30, 'spike');
    this.spike.body.setAllowGravity(false);
    this.spike.body.setImmovable(true);
    this.square.y = groundLevel;
    this.square.x = middle - 35;
    this.physics.add.collider(this.square, this.spike, () => {
        this.square.body.setVelocityY(0);
        /*this.dead = true;
        this.square.body.setAllowGravity(false);
        this.square.body.setImmovable(true);*/
    }, null, this);
}

function update() {
    this.background.tilePositionX += 10;
    this.spike.x -= 10;
    this.spikeTexture.y = window.innerHeight - 20;
    let groundLevel = window.innerHeight - 35;
    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.square.body.blocked.down && !this.dead) {
        this.time = performance.now();
        this.square.body.setVelocityY(-250);
        this.tweens.add({
            targets: this.square,
            angle: this.square.angle + 180,
            duration: 750,
            ease: 'Cubic.out'
        });
        if (this.square.body.blocked.down && this.square.angle % 90 !== 0) {
            this.square.angle = Math.round(this.square.angle / 90) * 90;
            this.time2 = performance.now();
            console.log(this.time2 - this.time);
        }
    }
}