'use strict'
const counter = {numbers: [1, 2, 3, 4], animal:'owl',layer2:{a:2}};
counter.cout = function(){
    console.log('this is first layer\n-------------------')
    this.numbers.forEach(n=>console.log(this.animal+' '+n))
    const abc =function(){
        console.log(this.animal)
    }
    abc()
    console.log('this is second layer\n-------------------')
}
counter.cout()