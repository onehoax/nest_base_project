import { RoleCreateDto } from "@app/entity/role/dto/role-create.dto";
import { PartialType } from "@nestjs/swagger";

export class RoleUpdateDto extends PartialType(RoleCreateDto) {}
