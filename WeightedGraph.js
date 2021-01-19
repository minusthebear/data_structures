class WeightedGraph {
    constructor() {
        this.adjacencyList = {}
    }
    addVertex(x) {
        if (!this.adjacencyList[x]) this.adjacencyList[x] = []
    }
    addEdge(x,y,weight) {
        function sortByKey(a,b) {
            let aa = a.node.toLowerCase(),
                bb = b.node.toLowerCase()

            if (aa < bb) return -1
            if (aa > bb) return 1
            return 0
        }

        if (!x || !y || !weight) return null
        if (!this.adjacencyList[x]) this.adjacencyList[x] = []
        if (!this.adjacencyList[y]) this.adjacencyList[y] = []
        this.adjacencyList[x].push({node:y, weight})
        this.adjacencyList[y].push({node:x, weight})
        this.adjacencyList[x].sort((a,b) => sortByKey(a,b))
        this.adjacencyList[y].sort((a,b) => sortByKey(a,b))
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue()
        const distances = {}
        const previous = {}
        let smallest
        let path = []

        // build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0
                nodes.enqueue(vertex, 0)
            } else {
                distances[vertex] = Infinity
                nodes.enqueue(vertex, Infinity)
            }
            previous[vertex] = null
        }
        // while something to visit
        while(nodes.values.length) {
            smallest = nodes.dequeue().val
            if (smallest === finish) {

                while (previous[smallest]) {
                    path.push(smallest)
                    smallest = previous[smallest]
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let x in this.adjacencyList[smallest]) {

                    let nextNode = this.adjacencyList[smallest][x] // find neighboring node
                    let candidate = distances[smallest] + nextNode.weight // calculate next distance to neighboring node
                    let nextNeighbor = nextNode.node
                    if (candidate < distances[nextNeighbor]) {
                        distances[nextNeighbor] = candidate // updating smallest distance to neighbor
                        previous[nextNeighbor] = smallest // updating previous - How we got to neighbor
                        nodes.enqueue(nextNeighbor, candidate) // enqueue in priorityQueue with new priority
                    }
                }
            }
        }
        return path.concat(smallest).reverse()
    }
}

class PriorityQueue {
    constructor(){
        this.values = [];
    }
    enqueue(val, priority){
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp(){
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while(idx > 0){
            let parentIdx = Math.floor((idx - 1)/2);
            let parent = this.values[parentIdx];
            if(element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue(){
        const min = this.values[0];
        const end = this.values.pop();
        if(this.values.length > 0){
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown(){
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while(true){
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild,rightChild;
            let swap = null;

            if(leftChildIdx < length){
                leftChild = this.values[leftChildIdx];
                if(leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if(rightChildIdx < length){
                rightChild = this.values[rightChildIdx];
                if(
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if(swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}

/*
graph.addVertex("a")
graph.addVertex("b")
graph.addVertex("c")
graph.addVertex("d")
graph.addVertex("e")
graph.addVertex("f")

graph.addEdge("a","b",4)
graph.addEdge("a","c",2)
graph.addEdge("b","e",3)
graph.addEdge("c","d",2)
graph.addEdge("c","f",4)
graph.addEdge("d","e",3)
graph.addEdge("d","f",1)
graph.addEdge("e","f",1)
 */