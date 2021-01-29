const sqlInfo= require("../../sqlInfo");
const stateInfo = require("../../sqlInfo/state");
const tokenInfo =require('../../verification/index')

 class userOperation{
    async selectUserInfo(ctx, next) {
        ctx.set('Content-Type', 'application/json')
        const userInfo =await sqlInfo.findUserData(ctx.request['body']['email'])
        try{
            ctx.body=stateInfo.successInfo(tokenInfo(userInfo[0]));
        } catch (error) {
            ctx.status = 200;
            ctx.body =stateInfo.errorInfo(50010,'该用户未注册');
        }
    }
    async siginUserInfo(ctx, next) {
        ctx.set('Content-Type', 'application/json')
        let errorNum =0;
        if(Object.keys(ctx.request.query).length<4){
            ctx.body =stateInfo.errorInfo(404,'缺少必传参数'); 
            return false;
        }
        for(var i in ctx.request.query){
            if(i!='username'&&i!='password'&&i!='email'&&i!='password2'){
                errorNum++; 
            }
        }
        if(errorNum==1){
            ctx.body =stateInfo.errorInfo(404,'缺少必传参数'); 
        }else if((await sqlInfo.findUserData(ctx.request['query']['username'])).length>0){
            ctx.body =stateInfo.errorInfo(500,'重复注册'); 
        }else{
            await sqlInfo.addUserData(ctx.request.query)
            ctx.body =stateInfo.successInfo(tokenInfo(ctx.request.query),'注册成功');
        }
    }
    async delUserInfo(ctx, next){
        ctx.body =await sqlInfo.delData(ctx.request['query']['username'],1); 
        if(ctx.body.affectedRows>0){
            ctx.body =stateInfo.successInfo('','删除成功');
        }else{
            ctx.body =stateInfo.errorInfo(500,'删除失败'); 
    
        }
        
    }
    async updataUserInfo(ctx, next){
        ctx.body =await sqlInfo.updataUserInfo(ctx.request['body']['username'],ctx.request['body']); 
        if(ctx.body.affectedRows>0){
            ctx.body =stateInfo.successInfo('','修改成功');
        }else{
            ctx.body =stateInfo.errorInfo(500,'修改失败');
        }
        
        
    }
    async getContentInfo(ctx, next){
        try{
            var content =await sqlInfo.getContentInfos(ctx.request['body']); 
            if(content.length>0){
                ctx.body =stateInfo.successInfo(content,'查询成功');
            }else{
                ctx.body =stateInfo.errorInfo(500,'查询失败');
            }
        }catch(error){
            console.log(error)
            ctx.body =stateInfo.errorInfo(500,'查询失败');
        }
       
    }
}

module.exports = new userOperation;