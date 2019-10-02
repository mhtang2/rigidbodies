nodeList = []
edgeList = []
//Distance between two nodes
function distance(n1, n2) {
    return Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2))
}

function Node(x, y, m = 1, r = 10) {
    this.d = 2 * r
    this.r = r
    this.x = x
    this.y = y
    this.m = m
    this.fy = 0
    this.fx = 0
    //Distance and angle from center mass
    this.dst = 0
    this.ang = 0
    massT += m
    this.centerMass = function() {
        cmX += this.m * this.x
        cmY += this.m * this.y
    }
    this.calc = function() {
        if (this.y + this.r >= ground) {
            this.y = ground - this.r
            this.fy = 0
            grounded = 1
        } else {
            torque += (cmX - this.x) * this.m * gravityAccel
        }
    }

    this.update = function() {
        //Handle rotation
        let dy = this.y - cmY
        let dx = this.x - cmX
        let q = Math.atan2(dy, dx)
        let r = Math.sqrt(dy * dy + dx * dx)
        omega -= alpha * dt
        q += omega * dt
        let newx = cmX + r * Math.cos(q)
        let newy = cmY + r * Math.sin(q)
        this.oldx = this.x
        this.oldy = this.y
        this.x = newx
        this.y = newy
    }
    nodeList.push(this)
}

function Edge(n1, n2) {
    this.n1 = n1
    this.n2 = n2
    this.normLength = distance(n1, n2)
    edgeList.push(this)
}