class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.suceess = statusCode <500 // Assuming status codes below 400 are successful
    }
}

export { ApiResponse };