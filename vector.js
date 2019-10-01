function Vector(x, y) {
    this.x = x
    this.y = y
}

Vector.prototype.add=function(v2) {
    return (new Vector(this.x + v2.x, this.y + v2.y))
}