const stateInfo={
    successInfo:(dataInfo,message)=>{
        return {
            code:200,
            data:dataInfo,
            message:message||''
        }
    },
    errorInfo:(code,message)=>{
        return {
            code:code,
            data:'',
            message:message
        }
    }
}
module.exports =stateInfo