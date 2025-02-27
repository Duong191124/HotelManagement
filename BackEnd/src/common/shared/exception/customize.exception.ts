import { HttpException } from "@nestjs/common";

export class CustomizeException extends HttpException {
    constructor(message_error: string, status_code: number) {
        super(
            {
                status_code,
                error_message: message_error,
            },
            status_code,
        );
    }
}