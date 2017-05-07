var net = require('net');

module.exports = function isPortOccupied(port){
  return new Promise(function(resolve, reject){
    // 创建服务并监听该端口
    var server = net.createServer().listen(port);

    if(!port){
      resolve({
        status:true,
        desc:'port needed'
      });
      return;
    }

    server.on('listening', function () { // 执行这块代码说明端口未被占用
      server.close() // 关闭服务
      //console.log('The port【' + port + '】 is available.') // 控制台输出信息
      resolve({
        status: false,
        desc:'available'
      });
    })

    server.on('error', function (err) {
      var desc = err.code;
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        // console.log('The port【' + port + '】 is occupied, please change other port.')
        desc = 'The port【' + port + '】 is occupied, please change other port.';
      }
      if (err.code === 'EACCES') { // 端口已经被使用
        // console.log('Non-privileged user can not use port【' + port + '】.')
        desc = 'Non-privileged user can not use port【' + port + '】.';
      }
      reject({
        status: true,
        desc: desc
      });
    })
  });
};