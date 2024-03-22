import { LoginLogDto } from "@app/entity/login-log/dto/login-log.dto";
import { OmitType } from "@nestjs/swagger";

export class LoginLogCreateDto extends OmitType(LoginLogDto, [
  "id",
  "isDeleted",
  "createdAt",
  "updatedAt",
] as const) {}
