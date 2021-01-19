class Node {
    constructor(val) {
        this.value = val
        this.next = null
    }
}

class ScriptStack {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    push(val) {
        if (!val) return null
        let node = new Node(val)
        if (!this.head) {
            return assignFirstNode.call(this, node)
        }
        const nextNode = this.head
        this.head = node
        this.head.next = nextNode
        return ++this.length
    }
    pop() {
        return dequeue.apply(this)
    }
}

function assignFirstNode(node) {
    this.head = node
    this.tail = node
    return ++this.length
}

function dequeue() {
    if (!this.head) return null
    const node = this.head
    if (this.length === 1) {
        this.head = null
        this.tail = null
    } else {
        this.head = node.next
    }
    node.next = null
    this.length -= 1
    return node
}

class ScriptQueue {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    enqueue(x) {
        if (!x) return null
        let node = new Node(x)
        if (!this.head) {
            return assignFirstNode.call(this, node)
        }
        this.tail.next = node
        this.tail = node
        return ++this.length
    }
    dequeue() {
        return dequeue.apply(this)
    }
}