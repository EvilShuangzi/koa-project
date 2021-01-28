const Router = require('koa-router');
const userFun = require('./user/index');
const routerInfo = new Router();
const stateInfo = require("../sqlInfo/state");
const checkAuth = require("../verification/verificationCheck");

// const check =checkAuth();
routerInfo.post('/login',userFun.selectUserInfo)
routerInfo.post('/getuser',checkAuth,async (ctx)=>{
    if(Object.keys(ctx.userStatus).length>0){
        ctx.body= stateInfo.successInfo(ctx.userStatus)
    }else{
        ctx.body= stateInfo.errorInfo(50014,'token过期')
    }
})
routerInfo.get('/setuser',checkAuth,userFun.siginUserInfo)
// routerInfo.get('/deldata',userFun.delUserInfo)
routerInfo.post('/updatainfo',checkAuth,userFun.updataUserInfo)

module.exports = routerInfo