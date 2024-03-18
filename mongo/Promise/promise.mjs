const p = new Promise(function(fulfill, reject) {
    // 进行一些异步操作
    if(asyncTaskCompletedSuccessfully) {
      fulfill('Success!'); // 异步操作成功，调用fulfill
    } else {
      reject('Failure!'); // 异步操作失败，调用reject
    }
});
  
p.then(function(result) {
    console.log(result); // 处理成功的结果
}).catch(function(error) {
    console.log(error); // 处理失败的情况
});

const p1 = new Promise(function(fulfill, reject) {
    console.log('begin');
    fulfill('succeeded');
    console.log('end');
});
p1.then(console.log);

const pcatch = new Promise(function(fulfill, reject) {
    reject('did not work!');
});

pcatch.catch(function(val) {
    console.log('ERROR', val);
});