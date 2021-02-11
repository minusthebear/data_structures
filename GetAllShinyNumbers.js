// assuming negative numbers are accepted and each number is a whole number

export default function getAllShinyNumbers(x) {
    if (!Number.isFinite(x)) {
        return []
    }
    const arr = []

    let n = x + 1,
        nArr = [],
        isShiny = true,
        badIdx,
        isNegative = false

    while (arr.length < 100) {
        isNegative = n < 0
        nArr = Math.abs(n).toString().split('')
        isShiny = nArr.every((val, idx, array) => {
            if (idx === array.length - 1) return true
            if (Number(val) > Number(array[idx + 1])) {
                badIdx = idx
                return false
            }
            return true
        })

        if (isShiny) {
            arr.push(n)
            n += 1
        } else {
            n = getNewNumber(nArr, badIdx, isNegative)
        }
    }

    return arr
}

function getNewNumber(arr, idx, isNegative) {
    if (isNegative) {
        return -(Number(arr.map((a,i) => {
            if (idx === i) {
                return Number(a) - 1
            } else if (idx > i) {
                return a
            } else {
                return 9
            }
        }).join('')))
    }
    return Number(arr.map((a,i,array) => i <= idx ? a : array[idx]).join(''))
}