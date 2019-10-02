function setup() {
    //Graphics constants
    screen_width = 600
    screen_height = 600
    fps = 60
    //Output tick
    runsim = false
    //Environment constants
    gravityAccel = 980
    ground = 580
    dt = 1 / fps
    //Centermass
    cmX = 0
    cmY = 0
    cmVx = 0
    cmVy = 0
    cmAx = 0
    cmAy = 0
    cmFy = 0
    cmFx = 0
    massT = 0
    moment = 0
    grounded = 0
    //System angular stuff
    torque = 0
    alpha = 0
    omega = 0
    theta = 0
    //Initiate
    background(255, 255, 0)
    frameRate(fps)
    let canvas = createCanvas(screen_width, screen_height)
    canvas.mousePressed(handleClick)
}

function start() {
    runsim = true
}
//Update and draw
function draw() {
    clear()
    background(225)
    //Ground
    line(0, ground, screen_width, ground)
    if (runsim) {
        grounded = 0
        torque = 0
        //Calculate forces and torques
        for (let n of nodeList) {
            n.calc()
        }
        //Update forces and positions of nodes
        for (let n of nodeList) {
            circle(n.x, n.y, n.d, n.d)
        }
        //Draw edges
        for (let e of edgeList) {
            line(e.n1.x, e.n1.y, e.n2.x, e.n2.y)
        }

        stroke(255, 0, 0)
        circle(cmX, cmY, 3)
        stroke(0)
    } else {
        for (let n of nodeList) {
            circle(n.x, n.y, n.d, n.d)
        }
        for (let e of edgeList) {
            line(e.n1.x, e.n1.y, e.n2.x, e.n2.y)
        }
        stroke(255, 0, 0)
        circle(cmX, cmY, 3)
        stroke(0)
    }
}

function handleClick() {
    new Node(mouseX, mouseY)
    let l = nodeList.length
    edgeList.pop()
    if (l > 1) {
        new Edge(nodeList[l - 1], nodeList[l - 2])
    }
    new Edge(nodeList[0], nodeList[l - 1])
    moment = 0
    cmX = 0
    cmY = 0
    for (let n of nodeList) {
        n.centerMass()
    }
    cmX /= massT
    cmY /= massT
    for (let n of nodeList) {
        moment += n.m * (Math.pow(n.x - cmX, 2) + Math.pow(n.y - cmY, 2))
    }
}