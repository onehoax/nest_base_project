import { UserCreateDto } from "@app/entity/user/dto/user-create.dto";
import { UserUpdateDto } from "@app/entity/user/dto/user-update.dto";
import { IUserResponse } from "@app/entity/user/interface/user-response.interface";
import { UserService } from "@app/entity/user/service/user.service";
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

const controllerName: string = "user";

@ApiTags(`3. ${controllerName}`)
@Controller(controllerName)
@ApiBearerAuth()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get("/:id")
  @GenericFindByIdDocumentation(EntityEnum.USER)
  public findOne(@Param("id") id: string): Promise<HttpResponse<IUserResponse>> {
    return this.userService.findOne(id);
  }

  @Get()
  @GenericFindAllDocumentation(EntityEnum.USER)
  public findAll(): Promise<HttpResponse<IUserResponse[]>> {
    return this.userService.findAll();
  }

  @Post()
  @GenericCreateDocumentation(EntityEnum.USER)
  @ApiBody({
    type: UserCreateDto,
    required: true,
  })
  public create(@Body() userCreateDto: UserCreateDto): Promise<HttpResponse<IUserResponse>> {
    return this.userService.create(userCreateDto);
  }

  @Patch("/:id")
  @GenericUpdateDocumentation(EntityEnum.USER)
  @ApiBody({
    type: UserUpdateDto,
    required: true,
  })
  public update(
    @Param("id") id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<HttpResponse<ICountResponse>> {
    return this.userService.update(id, userUpdateDto);
  }

  @Delete("/:id")
  @GenericDeleteDocumentation(EntityEnum.USER)
  public delete(@Param("id") id: string): Promise<HttpResponse<ICountResponse>> {
    return this.userService.delete(id);
  }
}
