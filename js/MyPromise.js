//状态、改变状态传入的值value、回调函数的数组
const PENDING = 'pending';
const RESLOVED = 'resloved';
const REJECTED = 'rejected';

function MyPromise(fn){
  const _this = this;
  _this.value = null;
  _this.state = PENDING;
  _this.reslovedCallbacks = [];
  _this.rejectedCallbacks = [];
  
  function reslove(value){
    if(_this.state === PENDING){
      _this.state = RESLOVED;
      _this.value = value;
      _this.reslovedCallbacks.map( cp => cp(_this.value););
    }
  }
  function reject(value){
    if(_this.state === PENDING){
      _this.state = REJECTED;
      _this.value = value;
      _this.rejectedCallbacks.map( cp => cp(_this.value););
    }
    
  }
  try{
    fn(reslove, reject);
  }catch (e){
    throw new Error(e);
  }
}
//then 的参数是  可选的
MyPromise.prototype.then = function(onFulfilled, onRejected){
  const _this = this;
  onFulfilled = typeof onFulfilled === 'function'?onFulfilled: v => v;
  onRejected = typeof onRejected === 'function'?onRejected: r => { throw r},
  
  if(_this.state === PENDING){
    _this.reslovedCallbacks.push(onFulfilled);
    _this.rejectedCallbacks.push(onRejected);
  }
  if(_this.state === RESLOVED){
    onFulfilled(_this.value);
  }
  if(_this.state === REJECTED){
    onRejected(_this.value);
  }
  
}