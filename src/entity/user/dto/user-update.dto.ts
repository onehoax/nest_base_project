import { UserCreateDto } from "@app/entity/user/dto/user-create.dto";
import { PartialType } from "@nestjs/swagger";

export class UserUpdateDto extends PartialType(UserCreateDto) {}
