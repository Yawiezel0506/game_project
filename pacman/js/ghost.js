
// class for create the player
class Ghosts {
    // static speed
    static speed = 2;
    // bild the player elements
    constructor({position , velocity, color = 'red'}) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color;
        this.prevCollisions = [];
        this.speed = 2;
        this.scared = false;
    }

    // drow the player
    drow() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.scared ? 'blue' : this.color;
        c.fill();
        c.closePath();
    }

    // update the player position
    update() {
        this.drow();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

}

