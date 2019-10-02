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
    this.vy = 0
    this.vx = 0
    this.fx = 0
    this.fy = 0
    massCx += this.m * this.x
    massCy += this.m * this.y
    //Conversion factor force -> a*dt
    this.mdt = dt / this.m
    massT += m
    this.centerMass = function() {
        massCx += this.m * this.x
        massCy += this.m * this.y
    }
    this.calc = function() {
        if (this.y + this.r >= ground) {
            this.y = ground - this.r
            this.fy = 0
            grounded = 1
        } else {
            torque += (massCx - this.x) * this.m * gravityAccel
        }
    }
    this.gravity = function() {
        //If system is grounded don't accelerate y
        if (grounded) {
            this.fy = 0
            this.vy = 0
        } else {
            this.fy = this.m * gravityAccel
            this.vy += this.fy * this.mdt
            this.y += this.vy * dt
        }
    }
    this.update = function() {
        //Handle rotation
        let dy = this.y - massCy
        let dx = this.x - massCx
        let q = Math.atan2(dy, dx)
        let r = Math.sqrt(dy * dy + dx * dx)
        omega -= alpha * dt
        q += omega * dt
        let newx = massCx + r * Math.cos(q)
        let newy = massCy + r * Math.sin(q)
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