import { IEndPoint } from "@app/shared/endpoint/interface/endpoint.interface";
import { Injectable } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Injectable()
export class EndPointsService {
  public constructor(private readonly adapterHost: HttpAdapterHost) {}

  /**
   * Get all endpoints available in application
   *
   * @returns {IEndPoint[]}
   */
  public getAll(): IEndPoint[] {
    const adapter = this.adapterHost.httpAdapter.getInstance();
    const stack = adapter._router.stack;

    const availableEndPoints: IEndPoint[] = [];
    stack.forEach((element): void => {
      if (element.route)
        availableEndPoints.push({
          path: element.route.path,
          method: element.route.stack[0].method,
        });
    });

    const regex: RegExp = /\b(?:docs|auth|health|login-log|permission)\b/gi;
    const filteredEndPoints: IEndPoint[] = availableEndPoints.filter(
      (route) => !route.path.match(regex),
    );

    return filteredEndPoints;
  }
}
