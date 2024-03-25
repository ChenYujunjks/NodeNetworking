// 定义 oldFn 函数，计算数组的总和
function oldFn(list) {
    return list.reduce((acc, current) => acc + current, 0);
  }
  
  // 定义 overArg 装饰器
  function overArg(oldFn, transforms) {
    // 返回一个新的函数
    return function(arg) {
      // 使用 transforms 数组中的函数对 arg 的每个元素进行变换
      const transformedArgs = arg.map(item => {
        // 对每个元素依次应用 transforms 数组中的所有函数
        return transforms.reduce((acc, transform) => transform(acc), item);
      });
      // 将变换后的结果作为参数传递给 oldFn 函数，并返回结果
      return oldFn(transformedArgs);
    };
  }
  
  // 示例：使用 overArg 装饰器
  // 定义一些变换函数
  const addOne = x => x + 1;
  const multiplyTwo = x => x * 2;
  
  // 创建一个装饰后的函数
  const decoratedFn = overArg(oldFn, [addOne, multiplyTwo]);
  
  // 使用装饰后的函数
  console.log(decoratedFn([1, 2, 3])); // 应该输出: ((1+1)*2 + (2+1)*2 + (3+1)*2) = 18
  