class Node {
    constructor(x) {
        this.name = x
        this.prev = null
        this.next = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    push(x) {
        let node = new Node(x)
        if (this.length === 0) {
            this.head = node
            this.tail = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.length++
        return this
    }
    pop(x) {
        if (this.length === 0) return null
        let oldTail = this.tail
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            this.tail = oldTail.prev
            oldTail.prev = null
            this.tail.next = null
        }
        this.length--
        return oldTail
    }
    unshift(val){
        var newNode = new Node(val);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    shift() {
        if (this.length === 0) return null
        let oldHead = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            let newHead = oldHead.next
            oldHead.next = null
            this.head = newHead
            this.head.prev = null
        }
        this.length--
        return oldHead
    }
    get(idx) {
        if (idx === 0) return this.head
        if (idx === this.length - 1) return this.tail
        if (!idx || idx >= this.length) return null

        let count, current
        if (idx <= this.length / 2) {
            count = 1
            current = this.head.next
            while (count !== idx) {
                current = current.next
                count++
            }
        } else {
            count = this.length - 1
            current = this.tail
            while (count !== idx) {
                current = current.prev
                count--
            }
        }
        return current
    }
    set(x, idx) {
        let node = this.get(idx)
        if (node) {
            node.name = x
            return this
        }
        return null
    }
    insert(x, idx) {
        if (idx < 0 || idx > this.length) return null
        if (idx === 0) return this.unshift(x)
        if (idx === this.length) return this.push(x)
        if (!x || !idx) return null

        const node = new Node(x)
        let count = 0,
            prev = this.get(idx - 1),
            next = prev.next

        node.next = next // assigns values to node
        node.prev = prev
        prev.next = node // assigns node to linked list
        next.prev = node
        this.length++
        return this
    }
    remove(idx) {
        if (idx < 0 || idx >= this.length) return null
        if (idx === 0) return this.shift(idx)
        if (idx === x.length - 1) return this.pop(idx)

        let node = this.get(idx),
            prev = node.prev,
            next = node.next

        prev.next = next
        next.prev = prev
        node.prev = null
        node.next = null
        this.length--
        return node
    }

}