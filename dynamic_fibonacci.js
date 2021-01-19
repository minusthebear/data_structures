function fibonacci(num, obj = {}) {
    if (num <= 2) return 1
    if (obj[num]) return obj[num]
    const res = fibonacci(num-2, obj) + fibonacci(num-1, obj)
    obj[num] = res
    return res
}