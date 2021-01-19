const dirMap = {
    u: { x: 0, y: -1 },
    r: { x: 1, y: 0 },
    d: { x: 0, y: 1 },
    l: { x: -1, y: 0 }
}

function CorrectPath(pathString) {
    const map = Array(5*5)
    return trace(pathString, map)
}

function trace(path, [...map], x = 0, y = 0, newPath = "") {
    const steps = path.split(""),
        nextMove = steps.shift()

    if (nextMove === undefined) {
        if (5 * y + x === (5*5-1)) return newPath
        return "Bad move"
    }

    if (nextMove === "?") {
        const moves = availableMoves(x,y,map)
        if (!moves.length) return "Bad move"
        for(let i = 0; i<moves.length; i++) {
            let move = moves[i],
                trySteps = [move,...steps].join(""),
                res = trace(trySteps,map,x,y,newPath)
            if (!res || res === "Bad move") continue
            else return res
        }
        return "Bad move"
    } else {
        if (!canMove(nextMove, x, y, map)) return "Bad move"

        const pos = dirMap[nextMove],
            newX = pos.x + x,
            newY = pos.y + y
        newPath += nextMove
        map[5*newY+newX] = nextMove
        return trace(steps.join(""),map,newX,newY,newPath)
    }
}

function availableMoves(x,y,map) {
    const steps = []
    Object.keys(dirMap).forEach(z => {
        if (canMove(z,x,y,map)) steps.push(z)
    })
    return steps
}

function canMove(dir, xPath, yPath, map) {
    const pos = dirMap[dir],
        x = pos.x + xPath,
        y = pos.y + yPath
    if (x > 4 || x < 0 || y > 4 || y < 0) return false
    if (map[5*y+x] !== undefined) return false
    return true
}