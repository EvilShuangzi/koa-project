// const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
// const verify = Promise.promisify(jwt.verify);
const stateInfo = require("../sqlInfo/state");

// let { secret } = require("../util/secret");

async function check(ctx, next) {
  let url = ctx.request.url.split('?')[0];
  // 登录 不用检查
  if (url == "/login")await next()
  else {
    // 规定token写在header 的 'autohrization' 
    let token =ctx.request.headers["authorization"];
    if(!token){
        stateInfo.errorInfo(50014,'token无效');
        return false;
    }
    // 解码
    try{  
      let payload = await jwt.verify(token,'WFT_DSA');
      let { time, timeout } = payload;
      let data = new Date().getTime();
      
      if (data - time <= timeout) {
          // 未过期
          ctx.userStatus ={id:payload['id'],user:payload['user']}
          await next();
      } else {
          //过期
          ctx.userStatus ={};
          ctx.body=stateInfo.errorInfo(50015,'登陆过期')
      }
    }catch(error){
      ctx.body=stateInfo.errorInfo(50015,'登陆过期')

    }
  }
}

module.exports = check