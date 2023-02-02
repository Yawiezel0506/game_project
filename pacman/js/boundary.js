// class for the boundaryes
class Boundary {
  // static elements for size
  static width = 40;
  static height = 40;

  // bild the boundary elements
  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  // paint the bountery
  drow() {
    //   c.fillStyle = "blue";
    //   c.fillRect(this.position.x, this.position.y, this.width, this.height);

    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
