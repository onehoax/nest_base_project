import { RoleCreateDto } from "@app/entity/role/dto/role-create.dto";
import { RoleUpdateDto } from "@app/entity/role/dto/role-update.dto";
import { IRole } from "@app/entity/role/interface/role.interface";
import { RoleService } from "@app/entity/role/service/role.service";
import {
  GenericCreateDocumentation,
  GenericDeleteDocumentation,
  GenericFindAllDocumentation,
  GenericFindByIdDocumentation,
  GenericUpdateDocumentation,
} from "@app/shared/doc/generic.doc";
import { EntityEnum } from "@inlaze_techlead/gannar-core";
import { ICountResponse } from "@app/shared/response/interface/count-response.interface";
import { HttpResponse } from "@app/shared/response/model/http-response.model";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

const controllerName: string = "role";

@ApiTags(`4. ${controllerName}`)
@Controller(controllerName)
@ApiBearerAuth()
export class RoleController {
  public constructor(private readonly roleService: RoleService) {}

  @Get("/:id")
  @GenericFindByIdDocumentation(EntityEnum.ROLE)
  public findOne(@Param("id") id: string): Promise<HttpResponse<IRole>> {
    return this.roleService.findOne(id);
  }

  @Get()
  @GenericFindAllDocumentation(EntityEnum.ROLE)
  public findAll(): Promise<HttpResponse<IRole[]>> {
    return this.roleService.findAll();
  }

  @Post()
  @GenericCreateDocumentation(EntityEnum.ROLE)
  @ApiBody({
    type: RoleCreateDto,
    required: true,
  })
  public create(@Body() roleCreateDto: RoleCreateDto): Promise<HttpResponse<IRole>> {
    return this.roleService.create(roleCreateDto);
  }

  @Patch("/:id")
  @GenericUpdateDocumentation(EntityEnum.ROLE)
  @ApiBody({
    type: RoleUpdateDto,
    required: true,
  })
  public update(
    @Param("id") id: string,
    @Body() roleUpdateDto: RoleUpdateDto,
  ): Promise<HttpResponse<ICountResponse>> {
    return this.roleService.update(id, roleUpdateDto);
  }

  @Delete("/:id")
  @GenericDeleteDocumentation(EntityEnum.ROLE)
  public delete(@Param("id") id: string): Promise<HttpResponse<ICountResponse>> {
    return this.roleService.delete(id);
  }
}
