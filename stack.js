class Node {
    constructor(val) {
        this.name = val
        this.next = null
    }
}

class Stack {
    constructor() {
        this.first = null
        this.last = null
        this.length = 0
    }
    push(x){
        let node = new Node(x)
        if (!this.first) {
            this.first = node
            this.last = node
        } else {
            let temp = this.first
            this.first = node
            this.first.next = temp
        }
        return ++this.length
    }

    pop(){
        if (!this.first) return null
        let temp = this.first
        if (this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next
        this.length--
        return temp.name
    }
}

module.exports = Stack