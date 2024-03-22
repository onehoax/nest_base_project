import { RoleCreateDto } from "@app/entity/role/dto/role-create.dto";
import { RoleUpdateDto } from "@app/entity/role/dto/role-update.dto";
import { IRole } from "@app/entity/role/interface/role.interface";
import {
  ROLE_REPOSITORY,
  IRoleRepository,
} from "@app/entity/role/interface/role.repository.interface";
import { common, entity } from "@inlaze_techlead/gannar-core";
import { LoggerService } from "@inlaze_techlead/inlaze-common";
import { ResponseActionEnum } from "@app/shared/response/enum/response-action.enum";
import { ICountResponse } from "@app/shared/response/interface/count-response.interface";
import { HttpResponse } from "@app/shared/response/model/http-response.model";
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class RoleService {
  public constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: IRoleRepository,
    private readonly loggerService: LoggerService,
  ) {}

  public async findOne(id: string): Promise<HttpResponse<IRole>> {
    const role: IRole | null = await this.roleRepository.findOne(id);

    if (!role) throw new NotFoundException(entity.notExists);

    return new HttpResponse<IRole>({
      data: role,
      success: true,
      message: common.success,
    });
  }

  public async findAll(): Promise<HttpResponse<IRole[]>> {
    const roles: IRole[] = await this.roleRepository.findAll();

    return new HttpResponse<IRole[]>({
      data: roles,
      success: true,
      message: common.success,
    });
  }

  public async create(roleCreateDto: RoleCreateDto): Promise<HttpResponse<IRole>> {
    const exists: IRole | null = await this.roleRepository.findByName(roleCreateDto.name);

    if (exists) throw new ConflictException(entity.alreadyExists);

    const role: IRole = await this.roleRepository.create(roleCreateDto);

    return new HttpResponse<IRole>({
      data: role,
      success: true,
      message: common.success,
    });
  }

  public async update(
    id: string,
    roleUpdateDto: RoleUpdateDto,
  ): Promise<HttpResponse<ICountResponse>> {
    let exists: IRole | null = await this.roleRepository.findOne(id);

    if (!exists) throw new NotFoundException(entity.notExists);

    const newName: string | undefined = roleUpdateDto.name;
    if (newName) {
      exists = await this.roleRepository.findByName(newName);
      if (exists) throw new ConflictException(entity.alreadyExists);
    }

    const updatedCount: number = await this.roleRepository.update(id, roleUpdateDto);

    if (!updatedCount) throw new InternalServerErrorException(common.failure);

    return new HttpResponse<ICountResponse>({
      data: { records: updatedCount, action: ResponseActionEnum.UPDATED },
      success: true,
      message: common.success,
    });
  }

  public async delete(id: string): Promise<HttpResponse<ICountResponse>> {
    const exists: IRole | null = await this.roleRepository.findOne(id);

    if (!exists) throw new NotFoundException(entity.notExists);

    const deletedCount: number = await this.roleRepository.delete(id);

    if (!deletedCount) throw new InternalServerErrorException(common.failure);

    return new HttpResponse<ICountResponse>({
      data: { records: deletedCount, action: ResponseActionEnum.DELETED },
      success: true,
      message: common.success,
    });
  }
}
