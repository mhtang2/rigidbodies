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
        //Calculate center mass and torque
        massCx = 0
        massCy = 0
        grounded = 0
        torque = 0
        //Calculate cetner of mass
        for (let n of nodeList) {
            n.centerMass()
        }
        massCx /= massT
        massCy /= massT
        for (let n of nodeList) {
            n.calc()
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
    } else {
        for (let n of nodeList) {
            circle(n.x, n.y, n.d, n.d)
        }
        for (let e of edgeList) {
            line(e.n1.x, e.n1.y, e.n2.x, e.n2.y)
        }
        stroke(255, 0, 0)
        circle(massCx, massCy, 3)
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
    massCx = 0
    massCy = 0
    for (let n of nodeList) {
        moment += n.m * (Math.pow(n.x - massCx, 2) + Math.pow(n.y - massCy, 2))
        n.centerMass()
    }
    massCx /= massT
    massCy /= massT
}