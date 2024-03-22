import {
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerService } from "@inlaze_techlead/inlaze-common";
import { I18nService } from "@app/shared/i18n/service/i18n.service";
import { common } from "@inlaze_techlead/gannar-core";

@Catch()
@Injectable({ scope: Scope.REQUEST })
export class AllExceptionsFilter implements ExceptionFilter {
  public constructor(
    private readonly i18nService: I18nService,
    private readonly loggerService: LoggerService,
  ) {}

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const { stack, message } = exception;

    this.loggerService.error({
      data: {
        context: this.constructor,
        message: `Error in server with status code ${status}: ${message}`,
        stack,
      },
    });

    const responseJson = {
      statusCode: status,
      timestamp: Date.now(),
      path: request.path,
      message: await this.i18nService.translate(message ?? common.failure),
    };

    response.status(status).json(responseJson);
  }
}
