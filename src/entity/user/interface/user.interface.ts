import { IRole } from "@app/entity/role/interface/role.interface";
import { UserStatusEnum } from "@app/entity/user/enum/user-status.enum";
import { IBase, LanguageEnum } from "@inlaze_techlead/gannar-core";

export interface IUser extends IBase {
  readonly fullName: string;
  readonly userName: string;
  readonly email: string;
  readonly password: string;
  readonly status: UserStatusEnum;
  readonly language: LanguageEnum;
  readonly role: IRole;
  readonly isSuperUser: boolean;
  readonly refreshToken?: string;
  readonly lastLogin?: Date;
}
