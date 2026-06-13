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
            gravity: { y: 0 },
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
    this.square = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
    this.physics.add.existing(this.square);
    this.square.body.setCollideWorldBounds(true);
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update() {
    let groundLevel = window.innerHeight - 25;
    if (!this.square.body.blocked.down) {
        console.log("The square is on the ground!");
        return;
    }
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

        // Establish safe local references to avoid context scope errors
        let mySquare = this.square;
        let startX = mySquare.x;
        let startY = mySquare.y;
        
        // 4. Define the curved path relative to the square's current position
        const curve = new Phaser.Curves.QuadraticBezier(
            startX, startY,              // Start Position
            startX + 200, startY - 250,  // Control Point (Pulls the line 250px UP)
            startX + 400, startY         // End Position (Lands 400px FORWARD)
        );

        const path = new Phaser.Curves.Path(startX, startY).add(curve);

        // 5. Use a tween to progress from 0 (start of path) to 1 (end of path)
        this.tweens.add({
            targets: mySquare,
            z: 1,
            getStart: () => 0,
            getEnd: () => 1,
            duration: 800, // Time in milliseconds to complete the curve (0.8 seconds)
            
            // On every single frame, pull the exact X/Y coordinate from the path math
            onUpdate: (tween) => {
                let position = path.getPoint(tween.getValue());
                mySquare.x = position.x;
                mySquare.y = position.y;
            },

            // Reset the movement lock once the jump is finished
        });
    }
}