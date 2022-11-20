class MyError extends Error {
    constructor(message, statusCode){
        super(message);

        this.statusCode= statusCode;
        this.Message = message;
    }
}

module.exports = MyError;