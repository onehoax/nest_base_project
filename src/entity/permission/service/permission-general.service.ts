import { PermissionCreateDto } from "@app/entity/permission/dto/permission-create.dto";
import { PermissionUpdateDto } from "@app/entity/permission/dto/permission-update.dto";
import { IPermission } from "@app/entity/permission/interface/permission.interface";
import {
  PERMISSION_REPOSITORY,
  IPermissionRepository,
} from "@app/entity/permission/interface/permission.repository.interface";
import { common, entity } from "@inlaze_techlead/gannar-core";
import { LoggerService } from "@inlaze_techlead/inlaze-common";
import { ResponseActionEnum } from "@app/shared/response/enum/response-action.enum";
import { ICountResponse } from "@app/shared/response/interface/count-response.interface";
import { HttpResponse } from "@app/shared/response/model/http-response.model";
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class PermissionGeneralService {
  public constructor(
    @Inject(PERMISSION_REPOSITORY) private readonly permissionRepository: IPermissionRepository,
    private readonly loggerService: LoggerService,
  ) {}

  public async findOne(id: string): Promise<HttpResponse<IPermission>> {
    const permission: IPermission | null = await this.permissionRepository.findOne(id);

    if (!permission) throw new NotFoundException(entity.notExists);

    return new HttpResponse<IPermission>({
      data: permission,
      success: true,
      message: common.success,
    });
  }

  public async findMany(ids: string[]): Promise<HttpResponse<IPermission[]>> {
    const permissions: IPermission[] = await this.permissionRepository.findMany(ids);

    return new HttpResponse<IPermission[]>({
      data: permissions,
      success: true,
      message: common.success,
    });
  }

  public async findAll(): Promise<HttpResponse<IPermission[]>> {
    const permissions: IPermission[] = await this.permissionRepository.findAll();

    return new HttpResponse<IPermission[]>({
      data: permissions,
      success: true,
      message: common.success,
    });
  }

  public async findByModuleAndMethod(
    path: string,
    method: string,
  ): Promise<HttpResponse<IPermission>> {
    const permission: IPermission | null = await this.permissionRepository.findByModuleAndMethod(
      path,
      method,
    );

    if (!permission) throw new NotFoundException(entity.notExists);

    return new HttpResponse<IPermission>({
      data: permission,
      success: true,
      message: common.success,
    });
  }

  public async createMany(
    permissionCreateDtos: PermissionCreateDto[],
  ): Promise<HttpResponse<IPermission[]>> {
    const permissions: IPermission[] =
      await this.permissionRepository.createMany(permissionCreateDtos);

    if (permissionCreateDtos.length !== permissions.length)
      throw new InternalServerErrorException(common.failure);

    return new HttpResponse<IPermission[]>({
      data: permissions,
      success: true,
      message: common.success,
    });
  }

  public async update(
    id: string,
    permissionUpdateDto: PermissionUpdateDto,
  ): Promise<HttpResponse<ICountResponse>> {
    const exists: IPermission | null = await this.permissionRepository.findOne(id);

    if (!exists) throw new NotFoundException(entity.notExists);

    const updatedCount: number = await this.permissionRepository.update(id, permissionUpdateDto);

    if (!updatedCount) throw new InternalServerErrorException(common.failure);

    return new HttpResponse<ICountResponse>({
      data: { records: updatedCount, action: ResponseActionEnum.UPDATED },
      success: true,
      message: common.success,
    });
  }

  public async deleteMany(ids: string[]): Promise<HttpResponse<ICountResponse>> {
    const deletedCount: number = await this.permissionRepository.deleteMany(ids);

    return new HttpResponse<ICountResponse>({
      data: { records: deletedCount, action: ResponseActionEnum.DELETED },
      success: true,
      message: common.success,
    });
  }
}
