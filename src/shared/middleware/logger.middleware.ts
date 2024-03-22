import { LoggerService } from "@inlaze_techlead/inlaze-common";
import { NestMiddleware, Injectable, HttpStatus } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleWare implements NestMiddleware {
  public constructor(private readonly loggerService: LoggerService) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    this.onStarted(req, res);
    res.on("finish", () => this.onFinished(req, res));
    next();
  }

  private onFinished(req: Request, res: Response): void {
    const { statusCode, statusMessage } = res;
    const { method, originalUrl } = req;
    const responseTime = Date.now() - res.locals.startTime;
    this.loggerService.http({
      data: {
        context: this.constructor,
        message: `Finishing ${method} ${originalUrl} ${statusCode} ${statusMessage} - ${responseTime}ms`,
      },
    });
    if ([HttpStatus.MOVED_PERMANENTLY, HttpStatus.FOUND].includes(res.statusCode))
      this.loggerService.info({
        data: {
          context: this.constructor,
          message: `Redirecting to ${JSON.stringify(res.getHeaders().location)}`,
          status: res.statusCode,
        },
      });
  }

  private onStarted(req: Request, res: Response): void {
    res.locals.startTime = Date.now();
    const { method, originalUrl } = req;
    const userAgent = req.get("user-agent") ?? "";
    this.loggerService.http({
      data: {
        context: this.constructor,
        message: `Starting ${method} ${originalUrl} ${userAgent}`,
      },
    });
  }
}
