import { UserCreateDto } from "@app/entity/user/dto/user-create.dto";
import { UserUpdateDto } from "@app/entity/user/dto/user-update.dto";
import { IUserResponse } from "@app/entity/user/interface/user-response.interface";
import {
  IUserRepository,
  USER_REPOSITORY,
} from "@app/entity/user/interface/user.repository.interface";
import { BcryptService } from "@app/shared/bcrypt/service/bcrypt.service";
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
export class UserService {
  public constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly bcryptService: BcryptService,
    private readonly loggerService: LoggerService,
  ) {}

  public async findOne(id: string): Promise<HttpResponse<IUserResponse>> {
    const user: IUserResponse | null = await this.userRepository.findOne(id);

    if (!user) throw new NotFoundException(entity.notExists);

    return new HttpResponse<IUserResponse>({
      data: user,
      success: true,
      message: common.success,
    });
  }

  public async findAll(): Promise<HttpResponse<IUserResponse[]>> {
    const users: IUserResponse[] = await this.userRepository.findAll();

    return new HttpResponse<IUserResponse[]>({
      data: users,
      success: true,
      message: common.success,
    });
  }

  public async create(userCreateDto: UserCreateDto): Promise<HttpResponse<IUserResponse>> {
    const exists: IUserResponse | null = await this.userRepository.findByUsernameOrEmail(
      userCreateDto.userName,
      userCreateDto.email,
    );

    if (exists) throw new ConflictException(entity.alreadyExists);

    userCreateDto.password = await this.bcryptService.hash(userCreateDto.password);

    const user: IUserResponse = await this.userRepository.create(userCreateDto);

    return new HttpResponse<IUserResponse>({
      data: user,
      success: true,
      message: common.success,
    });
  }

  public async update(
    id: string,
    userUpdateDto: UserUpdateDto,
  ): Promise<HttpResponse<ICountResponse>> {
    let exists: IUserResponse | null = await this.userRepository.findOne(id);

    if (!exists) throw new NotFoundException(entity.notExists);

    const newUserName: string | undefined = userUpdateDto.userName;
    const newEmail: string | undefined = userUpdateDto.email;
    if (newUserName || newEmail) {
      exists = await this.userRepository.findByUsernameOrEmail(newUserName, newEmail);
      if (exists) throw new ConflictException(entity.alreadyExists);
    }

    const newPassword: string | undefined = userUpdateDto.password;
    if (newPassword) userUpdateDto.password = await this.bcryptService.hash(newPassword);

    const updatedCount: number = await this.userRepository.update(id, userUpdateDto);

    if (!updatedCount) throw new InternalServerErrorException(common.failure);

    return new HttpResponse<ICountResponse>({
      data: { records: updatedCount, action: ResponseActionEnum.UPDATED },
      success: true,
      message: common.success,
    });
  }

  public async delete(id: string): Promise<HttpResponse<ICountResponse>> {
    const exists: IUserResponse | null = await this.userRepository.findOne(id);

    if (!exists) throw new NotFoundException(entity.notExists);

    const deletedCount: number = await this.userRepository.delete(id);

    if (!deletedCount) throw new InternalServerErrorException(common.failure);

    return new HttpResponse<ICountResponse>({
      data: { records: deletedCount, action: ResponseActionEnum.DELETED },
      success: true,
      message: common.success,
    });
  }
}
