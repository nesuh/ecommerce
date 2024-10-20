import { 
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

export interface HttpExceptionResponse {
    statusCode: number;
    message: string;
    error: string;
}

export class AllExceptionFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        console.log('exception :: ==>', exception);

        // Extract exception response if it exists
        const exceptionResponse = 
            exception instanceof HttpException 
                ? exception.getResponse() 
                : null;

        const responseBody = {
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()).url,
            message: 
                (exceptionResponse as HttpExceptionResponse)?.message || 
                (exceptionResponse as HttpExceptionResponse)?.error || 
                'Something went wrong!',
            errorResponse: exceptionResponse as HttpExceptionResponse,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
