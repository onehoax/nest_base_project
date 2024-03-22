import { LoginLogCreateDto } from "@app/entity/login-log/dto/login-log-create.dto";
import { ILoginLog } from "@app/entity/login-log/interface/login-log.interface";
import { LoginLogService } from "@app/entity/login-log/service/login-log.service";
import {
  GenericCreateDocumentation,
  GenericFindAllDocumentation,
} from "@app/shared/doc/generic.doc";
import { EntityEnum } from "@inlaze_techlead/gannar-core";
import { HttpResponse } from "@app/shared/response/model/http-response.model";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

const controllerName: string = "login-log";

@ApiTags(`6. ${controllerName}`)
@Controller(controllerName)
@ApiBearerAuth()
export class LoginLogController {
  public constructor(private readonly loginLogService: LoginLogService) {}

  @Get()
  @GenericFindAllDocumentation(EntityEnum.LOGIN_LOG)
  public findAll(): Promise<HttpResponse<ILoginLog[]>> {
    return this.loginLogService.findAll();
  }

  @Post()
  @GenericCreateDocumentation(EntityEnum.LOGIN_LOG)
  @ApiBody({
    type: LoginLogCreateDto,
    required: true,
  })
  public create(@Body() loginLogCreateDto: LoginLogCreateDto): Promise<HttpResponse<ILoginLog>> {
    return this.loginLogService.create(loginLogCreateDto);
  }
}
