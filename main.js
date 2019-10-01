function setup() {
    //Graphics constants
    screen_width = 600
    screen_height = 600
    fps = 60
    //Output tick
    opticks = 30
    //Environment constants
    gravityAccel = 98
    ground = 500
    dt = 1 / fps
    //Centermass
    massCx = 0
    massCy = 0
    massT = 0
    //System angular stuff
    moment = 0
    alpha = 0
    omega = 0
    //Initiate
    background(255, 255, 0)
    frameRate(fps)
    createCanvas(screen_width, screen_height)
    var n1 = new Node(240, 300)
    var n2 = new Node(320, 230)
    var n3 = new Node(270, 300)
    massCx /= massT
    massCy /= massT

    for (let n of nodeList) {
        moment += n.m * (Math.pow(n.x - massCx, 2) + Math.pow(n.y - massCy, 2))
    }
    new Edge(n2, n1)
    new Edge(n2, n3)
    new Edge(n1, n3)
}
var tick = 0
//Update and draw
function draw() {
    tick++
    clear()
    //Ground
    line(0, ground, screen_width, ground)

    //Calculate center mass and torque
    massCx = 0
    massCy = 0
    grounded = 0
    torque = 0
    for (let n of nodeList) {
        n.centerMass()
    }
    massCx /= massT
    massCy /= massT
    for (let n of nodeList) {
        n.calc()
    }
    if (tick == opticks) {
        tick = 0
    }
    alpha = torque / moment
    //Update forces and positions of nodes
    for (let n of nodeList) {
        n.update()
        circle(n.x, n.y, n.d, n.d)
    }
    //Draw edges
    for (let e of edgeList) {
        line(e.n1.x, e.n1.y, e.n2.x, e.n2.y)
    }
    stroke(255, 0, 0)
    circle(massCx, massCy, 3)
    stroke(0)
}