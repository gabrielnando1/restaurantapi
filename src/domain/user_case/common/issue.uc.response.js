export class IssueUCResponse {
    constructor(success, statusCode, erroMessage) {
        this.success = success;
        this.statusCode = statusCode;
        this.erroMessage = erroMessage;
    }
}