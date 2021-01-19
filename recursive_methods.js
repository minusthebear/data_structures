function getNthFiboIterative(n) {
    if (n <= 1) return n
    let sum = 0,
        last = 1,
        secLast = 0

    for (let i = 1; i < n; i++) {
        sum = secLast + last
        secLast = last
        last = sum
    }
    return sum
}

function getNthFiboO2n(n) {
    if (n <= 1) return n
    return getNthFiboO2n(n - 1) + getNthFiboO2n(n - 2)
}

function getNthFiboTailON(n, lastLast = 0, last = 1) {
    if (n === 0) return lastLast
    if (n === 1) return last
    return getNthFiboTailON(n - 1, last, lastLast + last)
}

function pascalTriangleGetRowCol(row, col) {
    if (col === 0) return 1
    else if (row === 0) return 0
    else return pascalTriangleGetRowCol(row - 1, col) + pascalTriangleGetRowCol(row - 1, col - 1)
}

function pascalTriangleGetRowSum(num) {
    const triangle = [[1]]
    while (triangle.length < num) {
        let numArr = triangle[triangle.length - 1],
            retArr = [1]

        for (let i = 0; i < numArr.length - 1; i++) {
            retArr.push(numArr[i] + numArr[i+1])
        }
        retArr.push(1)
        triangle.push(retArr)
    }
    return triangle[triangle.length - 1].reduce((x,y) => x+y,0)
}