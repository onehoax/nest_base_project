import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from "@nestjs/common";
import { Observable, map, mergeMap } from "rxjs";
import { HttpArgumentsHost, Scope } from "@nestjs/common/interfaces";
import { HttpResponse } from "@app/shared/response/model/http-response.model";
import { I18nService } from "@app/shared/i18n/service/i18n.service";
import { common } from "@inlaze_techlead/gannar-core";

@Injectable({ scope: Scope.REQUEST })
export class ResponseInterceptor<T> implements NestInterceptor {
  public constructor(private readonly i18nService: I18nService) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now: number = Date.now();
    const httpContext: HttpArgumentsHost = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      mergeMap(async (data: HttpResponse<T>) => {
        const message: string = await this.i18nService.translate(data.message ?? common.success);
        return { ...data, message: message };
      }),
      map((data: HttpResponse<unknown>) => ({
        data: data.data,
        success: data.success,
        message: data.message,
        pagination: data.pagination,
        path: request.path,
        duration: `${Date.now() - now}ms`,
        method: request.method,
      })),
    );
  }
}
