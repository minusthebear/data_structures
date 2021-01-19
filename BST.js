class Node {
    constructor(val) {
        this.value = val
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(x) {
        if (!x && x !== 0) return null
        let newNode = new Node(x)
        if (!this.root) {
            this.root = newNode
            return this
        }
        let current = this.root
        while(true) {
            if (x === current.value) {
                return null
            }
            if (x < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return this
                }
                current = current.left
            } else {
                if (current.right === null) {
                    current.right = newNode
                    return this
                }
                current = current.right
            }
        }
    }
    BFS () {
        if (!this.root) return null
        let node = this.root
        const result = [],
            queue = [node];
        let val;

        while (queue.length) {
            val = queue.shift()
            if (!val) break;

            result.push(val.value)
            if (val.left)  queue.push(val.left)
            if (val.right) queue.push(val.right)
        }
        return result
    }

    DFSPreOrder() {
        if (!this.root) return null
        let node = this.root

        const result = []

        function preOrderRecursive(x) {
            if (!x) return
            let num = x.value
            result.push(num)
            if (x.left) {
                preOrderRecursive(x.left);
            }
            if (x.right) {
                preOrderRecursive(x.right);
            }
        }
        preOrderRecursive(node)
        return result
    }

    DFSPostOrder() {
        if (!this.root) return null
        let node = this.root

        const result = []

        function postOrderRecursive(x) {
            if (!x) return
            if (x.left) {
                postOrderRecursive(x.left);
            }
            if (x.right) {
                postOrderRecursive(x.right);
            }
            let num = x.value
            result.push(num)
        }
        postOrderRecursive(node)
        return result
    }
    DFSPostFuncProgramming() {
        if (!this.root) return null
        let node = this.root

        function postOrderRecursive(x) {
            if (!x) return
            let arr = []
            if (x.left) {
                arr.push(...postOrderRecursive(x.left))
            }
            if (x.right) {
                arr.push(...postOrderRecursive(x.right))
            }
            arr.push(x.value)
            return arr;
        }

        return postOrderRecursive(node)
    }
    DFSPostInOrderFuncProgramming() {
        if (!this.root) return null
        let node = this.root

        function postOrderRecursive(x) {
            if (!x) return
            let arr = []
            if (x.left) {
                arr.push(...postOrderRecursive(x.left))
            }
            arr.push(x.value)
            if (x.right) {
                arr.push(...postOrderRecursive(x.right))
            }
            return arr;
        }

        return postOrderRecursive(node)
    }
}


class MaxBinaryHeap {
    constructor() {
        this.values = []
    }
    insert(elm) {
        this.values.push(elm)
        return this.bubbleUp()
    }
    extractMax() {
        const max = this.values[0]
        const end = this.values.pop()
        if (this.values.length > 0) {

            this.values[0] = end
            this.sinkDown()
        }
        return max
    }
    bubbleUp() {
        let idx = this.values.length - 1
        const elm = this.values[idx]
        let parentIdx, parent

        while (idx > 0) {
            parentIdx = Math.floor((idx - 1) / 2)
            parent = this.values[parentIdx]

            if (elm <= parent) break;

            this.values[parentIdx] = elm
            this.values[idx] = parent
            idx = parentIdx
        }
        return this.values
    }
    sinkDown() {
        let idx = 0
        const length = this.values.length
        const elm = this.values[0]

        function recursive(idx) {
            let i = idx
            let left = 2 * idx + 1,
                right = 2 * idx + 2

            let leftChild, rightChild, swap = null

            if (left < length) {
                leftChild = this.values[left]
                if (leftChild > elm) {
                    swap = left
                }
            }
            if (right < length) {
                rightChild = this.values[right]
                if ((swap === null && rightChild > elm) || (swap !== null && rightChild > leftChild)) {
                    swap = right
                }
            }
            if (swap === null) return

            this.values[i] = this.values[swap]
            this.values[swap] = elm
            return recursive.call(this, swap)
        }
        return recursive.call(this, idx)
    }
}