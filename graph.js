class GraphClass {
    constructor() {
        this.adjacencyList = {}
    }
    addVertex(x) {
        if (!this.adjacencyList[x]) this.adjacencyList[x] = []
    }
    addEdge(x,y) {
        if (!x || !y) return null
        if (!this.adjacencyList[x]) this.adjacencyList[x] = []
        if (!this.adjacencyList[y]) this.adjacencyList[y] = []
        this.adjacencyList[x].push(y)
        this.adjacencyList[y].push(x)
        this.adjacencyList[x].sort()
        this.adjacencyList[y].sort()
    }
    removeEdge(x,y) {
        if (!x || !y) return null
        if (!this.adjacencyList[x] || !this.adjacencyList[y]) return null
        let idxOfY = this.adjacencyList[x].indexOf(y),
            idxOfX = this.adjacencyList[y].indexOf(x)

        if (idxOfY > -1) {
            this.adjacencyList[x].splice(idxOfY, 1)
        }
        if (idxOfX > -1) {
            this.adjacencyList[y].splice(idxOfX, 1)
        }
    }
    removeVertex(x) {
        if (!x || !this.adjacencyList[x]) return null
        while (this.adjacencyList[x].length) {
            let item = this.adjacencyList[x].pop(),
                list = this.adjacencyList[item].indexOf(x)

            if (!list) return null
            let idxOfX = this.adjacencyList[item].indexOf(x)

            if (idxOfX > -1) {
                this.adjacencyList[item].splice(idxOfX, 1)
            }
        }
        delete this.adjacencyList[x]
    }
    DFS_Recursive(start) {
        const result = [],
            visited = {},
            adjacencyList = this.adjacencyList;

        // a
        // b/c -> b
        // a/d -> d
        // b/e/f -> e
        // c/d/f -> c
        // a/e/f -> f
        function recursive(x) {
            if (!x) return null
            result.push(x)
            visited[x] = true
            adjacencyList[x].forEach(x => {
                if (!visited[x]) {
                    recursive(x)
                }
            })
        }

        recursive(start)
        return result
    }
    DFS_Iterative(start) {
        const result = [],
            visited = {},
            adjacencyList = this.adjacencyList,
            stack = [start];
        let item;
        visited[start] = true;

        // a
        // b/c -> c
        // a/e/f -> b/e/f -> f
        // d/e -> b/e/d -> d
        // b/e -> e
        // -> b

        while (stack.length) {
            item = stack.pop();
            result.push(item);
            if (adjacencyList[item]) {
                adjacencyList[item].forEach(x => {
                    if (!visited[x]) {
                        visited[x] = true
                        stack.push(x)
                    }
                })
            }
        }
        return result
    }
    BFS_Recursive(start) {
        if (!start) return null
        const result = [],
            visited = {},
            adjacencyList = this.adjacencyList;
        visited[start] = true
        result.push(start)

        function recursive(x) {
            if (!x) return null
            let queue = []
            adjacencyList[x].forEach(x => {
                if (!visited[x]) {
                    queue.push(x)
                    visited[x] = true
                    result.push(x)
                }
            })
            queue.forEach(y => {
                recursive(y)
            })
        }
        recursive(start)
        return result
    }
    BFS_Iterative(start) {
        if (!start) return null
        const result = [],
            visited = {},
            adjacencyList = this.adjacencyList,
            queue = [start];
        let item;
        visited[start] = true

        while (queue.length) {
            item = queue.shift()
            result.push(item)

            if (adjacencyList[item]) {
                adjacencyList[item].forEach(x => {
                    if (!visited[x]) {
                        queue.push(x)
                        visited[x] = true
                    }
                })
            }
        }
        return result
    }
}