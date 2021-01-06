class HashTable {
    // size should always be prime number
    constructor(size= 53) {
        this.keyMap = new Array(size)
    }

    _hash(key) {
        let total = 0
        const PRIME = 31
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i]
            let value = char.charCodeAt(0) - 96
            total = (total * PRIME + value) % this.keyMap.length
        }
        return total
    }

    set(key, value) {
        let idx = this._hash(key)
        if (!this.keyMap[idx]) {
            this.keyMap[idx] = []
        }
        this.keyMap[idx].push([key,value])
    }

    get(key) {
        let idx = this._hash(key)
        if (this.keyMap[idx]) {
            for (let i = 0; i < this.keyMap[idx].length; i++) {
                if (this.keyMap[idx][i][0] === key) {
                    return this.keyMap[idx][i][1]
                }
            }
        }
        return null
    }

    keys() {
        let keysArr = []
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if(!keysArr.includes(this.keyMap[i][j][0])) {
                        keysArr.push(this.keyMap[i][j][0])
                    }
                }
            }
        }
    }
    values() {
        let valsArr = []
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valsArr.includes(this.keyMap[i][j][1])) {
                        valsArr.push(this.keyMap[i][j][1])
                    }
                }
            }
        }
        return valsArr
    }
}