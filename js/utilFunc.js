function myCall(context){
  if( typeof this !== 'function' ){
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1)
  cosnt result = context.fn(args);
  return result;
  
}