function noFn(){
  return function(){};
}

if(process.env['QLS_ENV']==='mocha_test'){
  module.exports = {
    log: noFn,
    warn: noFn,
    error: noFn
  };
}else{
  module.exports = {
    log:function(){
      console.log.apply(console, arguments);
    },
    warn:function(){
      console.warn.apply(console, arguments);
    },
    error:function(){
      console.error.apply(console, arguments);
    }
  };
}