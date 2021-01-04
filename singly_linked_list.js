class Node {
    constructor(val) {
        this.name = val
        this.next = null
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    push(x) {
        const node = new Node(x)
        if (this.length === 0){
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            this.tail = node
        }
        this.length++
        return this
    }
    pop() {
        if (!this.head) return null
        let current = this.head,
            newTail = current.next
        while (current.next) {
            newTail = current
            current = current.next
        }
        this.length--
        if (this.length === 0) {
            this.head = null
            this.tail = null
        } else {
            this.tail = newTail
            this.tail.next = null
        }
        return current
    }
    shift() {
        if (!this.head) return null
        let current = this.head
        this.head = current.next
        current.next = null
        this.length--
        if (this.length === 0) {
            this.tail = null
        }
        return current
    }
    unshift(x) {
        if (!this.head) {
            return this.push(x)
        }
        let newHead = new Node(x)
        let next = this.head
        newHead.next = next
        this.head = newHead
        this.length++
        return this
    }
    get(idx) {
        if (idx < 0 || idx >= this.length) return null
        let current = this.head,
            count = 0
        while (count <= idx) {
            current = current.next
            count++
        }
        return current
    }
    set(x, idx) {
        let node = this.get(idx)
        if (node) {
            node.name = x
            return node
        }
        return null
    }
    insert(x, idx) {
        if (idx < 0 || idx > this.length) return null
        if (idx === 0) return this.unshift(x)
        if (idx === this.length) this.push(x)

        let newNode = new Node(x),
            prevNode = this.get(idx - 1),
            temp = prevNode.next
        newNode.next = temp
        prevNode.next = newNode
        this.length++
        return this
    }
    remove(idx) {
        if (idx < 0 || idx >= this.length) return null
        if (idx === 0) return this.shift()
        if (idx === this.length - 1) return this.pop()

        let prevNode = this.get(idx - 1),
            nodeToRemove = prevNode.next,
            nextNode = nodeToRemove.next

        prevNode.next = nextNode
        nodeToRemove.next = null
        this.length--
        return nodeToRemove
    }
    reverse() {
        let node = this.head,
            counter = 0,
            prev = null,
            next

        this.head = this.tail
        this.tail = node

        while (counter < this.length) {
            // assign next value from node next
            // this will later be assigned to node, which will be assigned to prev
            next = node.next
            // prev assigned to node.next
            // first time, prev is null since node was head and now tail
            node.next = prev
            //
            prev = node
            // becomes the next node to get next value, gets assigned to prev
            node = next
        }
        return this
    }
}


/*

        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        var next;
        var prev = null;
        for(var i = 0; i < this.length; i++){
            // get next from formerly this.head
            next = node.next;
            // first time, prev is null - after first time, next is prev
            node.next = prev;
            // prev gets set to node, first time prev is this.head
            prev = node;
            // node is node.text, first time this.head.next
            node = next;
        }
        return this;
 */

module.exports = SinglyLinkedList

