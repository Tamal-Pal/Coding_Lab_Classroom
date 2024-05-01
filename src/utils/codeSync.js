const checkFromFront = (a, b) => {
    if (!a || !b) return 0;

    var i = 0;
    while (a[i] && b[i] && a[i] === b[i]) {
        i++;
    }
    return i;
}

const checkFromBack = (a, b) => {
    if (!a || !b) return 0;

    var i = 1;
    while (a[a.length - i] && b[b.length - i] && (a[a.length - i] === b[b.length - i])) {
        i++;
    }

    return i-1;
}

module.exports.generateChange = (a, b) => {
    console.log('a', a)
    console.log('b', b)
    var front = checkFromFront(a, b);
    if(front === b.length) return [front, 0, ""]; //Means no change
    a = a?.slice(front)
    b = b?.slice(front)

    var back = checkFromBack(a, b);

    if(back > b.length){
        return [front, back, b];
    }

    return [front, back, b.slice(0, b.length - back)]
}