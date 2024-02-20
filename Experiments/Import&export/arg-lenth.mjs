function example(a, b) {
    if (arguments.length === 1) {
      console.log(`Only one argument: ${a}`);
      // 设置 b 的默认值
      b = 'default value';
    }
    console.log(a, b);
  }
  
example(1)