const p1 = new Promise(function(fulfill, reject) {
    fulfill(1);
});
const p2 = p1.then(function(val) {
    console.log(val);
    return val + 1;    
});
p2.then(console.log);