const calculator = {
    value: 0,
    add(a) {
      this.value += a;
      return this; // 返回this支持链式调用
    },
    subtract(a) {
      this.value -= a;
      return this;
    },
    multiply(a) {
      this.value *= a;
      return this;
    },
    getResult() {
      return this.value;
    }
  };
  
  // 使用链式调用进行计算
  const result = calculator.subtract(2).add(5).multiply(10).getResult();
  console.log(result); // 输出操作结果
  