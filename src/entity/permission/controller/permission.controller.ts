import { PermissionCreateDto } from "@app/entity/permission/dto/permission-create.dto";
import { PermissionUpdateDto } from "@app/entity/permission/dto/permission-update.dto";
import { IPermission } from "@app/entity/permission/interface/permission.interface";
import { PermissionGeneralService } from "@app/entity/permission/service/permission-general.service";
import { PermissionRefreshService } from "@app/entity/permission/service/permission-refresh.service";
import {
  GeneralResponseDocumentation,
  GenericCreateDocumentation,
  GenericDeleteDocumentation,
  GenericFindAllDocumentation,
  GenericFindByIdDocumentation,
  GenericUpdateDocumentation,
} from "@app/shared/doc/generic.doc";
import { EntityEnum } from "@inlaze_techlead/gannar-core";
import { ICountResponse } from "@app/shared/response/interface/count-response.interface";
import { HttpResponse } from "@app/shared/response/model/http-response.model";
import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

const controllerName: string = "permission";

@ApiTags(`5. ${controllerName}`)
@Controller(controllerName)
@ApiBearerAuth()
export class PermissionController {
  public constructor(
    private readonly permissionGeneralService: PermissionGeneralService,
    private readonly permissionRefreshService: PermissionRefreshService,
  ) {}

  @Get("/refresh")
  @GeneralResponseDocumentation(
    "Create/Delete available permissions based on the endpoints available in the system",
  )
  public refresh(): Promise<HttpResponse<ICountResponse>> {
    return this.permissionRefreshService.run();
  }

  @Get("/:module/:method")
  @GenericFindAllDocumentation(EntityEnum.PERMISSION)
  public findByModuleAndMethod(
    @Param("module") module: string,
    @Param("method") method: string,
  ): Promise<HttpResponse<IPermission>> {
    return this.permissionGeneralService.findByModuleAndMethod(module, method);
  }

  @Get("/:ids")
  @GenericFindByIdDocumentation(EntityEnum.PERMISSION)
  public findManyById(
    @Param("ids", ParseArrayPipe) ids: string[],
  ): Promise<HttpResponse<IPermission[]>> {
    return this.permissionGeneralService.findMany(ids);
  }

  @Get()
  @GenericFindAllDocumentation(EntityEnum.PERMISSION)
  public findAll(): Promise<HttpResponse<IPermission[]>> {
    return this.permissionGeneralService.findAll();
  }

  @Post()
  @GenericCreateDocumentation(EntityEnum.PERMISSION)
  @ApiBody({
    type: [PermissionCreateDto],
    required: true,
  })
  public createMany(
    @Body() permissionCreateDtos: PermissionCreateDto[],
  ): Promise<HttpResponse<IPermission[]>> {
    return this.permissionGeneralService.createMany(permissionCreateDtos);
  }

  @Patch("/:id")
  @GenericUpdateDocumentation(EntityEnum.PERMISSION)
  @ApiBody({
    type: PermissionUpdateDto,
    required: true,
  })
  public update(
    @Param("id") id: string,
    @Body() permissionUpdateDto: PermissionUpdateDto,
  ): Promise<HttpResponse<ICountResponse>> {
    return this.permissionGeneralService.update(id, permissionUpdateDto);
  }

  @Delete("/:ids")
  @GenericDeleteDocumentation(EntityEnum.PERMISSION)
  public delete(
    @Param("ids", ParseArrayPipe) ids: string[],
  ): Promise<HttpResponse<ICountResponse>> {
    return this.permissionGeneralService.deleteMany(ids);
  }
}
