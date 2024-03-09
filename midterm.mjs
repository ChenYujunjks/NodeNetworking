class MyList {
    constructor(name) {
      this.name = name
      this.items = [];
    }
  
    addItems(...listItems) {
      this.items = [...this.items, ...listItems];
    }
  
    render() {
      console.log(this.name, '\n-----');
      this.items.forEach((listItem, i) => {
        console.log(`${i + 1}. ${listItem}`);
      });
    }
}

const list1 = new MyList('Breakfast');
list1.addItems('ramen', 'bagel')

console.log(typeof list1 );
console.log(typeof MyList);
console.log(Object.getPrototypeOf(list1)=== MyList.prototype);
console.log(Object.getPrototypeOf(list1.render)===Function.prototype);
console.log(MyList.prototype.hasOwnProperty('addItems'));

