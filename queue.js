class Node {
    constructor(val) {
        this.name = val
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null
        this.last = null
        this.length = 0
    }
    enqueue(x) {
        let node = new Node(x)
        if (!this.first) {
            this.first = node
            this.last = node
        } else {
            this.last.next = node
            this.last = node
        }
        return ++this.length
    }
    dequeue() {
        if (!this.first) return null
        let node = this.first
        if (this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next
        this.length--
        return node.name
    }
}

module.exports = Queue