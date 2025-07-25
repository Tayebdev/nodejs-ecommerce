class ErrorAPI extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith(4) ? "failed" : "error"
    }
}

module.exports=ErrorAPI;