'use strict'
const counter = {numbers: [1, 2, 3, 4], animal:'owl',layer2:{a:2}};
counter.cout = function(){
    console.log('this is first layer\n-------------------')
    //this.numbers.forEach(function(n){
//        console.log(this.animal+' '+n)
//});
    this.newp=function(n){
        console.log(this.animal+' '+n)
    }
    this.newp()
}
counter.cout()