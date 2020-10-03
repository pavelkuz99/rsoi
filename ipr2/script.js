var theBiggest = function(a, b) {
    var result;
    a > b ? result = ["a", a] : result = ["b", b]
    return result;
}

console.log(theBiggest(2, 5))