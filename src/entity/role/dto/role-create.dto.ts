import { RoleDto } from "@app/entity/role/dto/role.dto";
import { OmitType } from "@nestjs/swagger";

export class RoleCreateDto extends OmitType(RoleDto, [
  "id",
  "isDeleted",
  "createdAt",
  "updatedAt",
] as const) {}
