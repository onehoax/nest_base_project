import { IPermission } from "@app/entity/permission/interface/permission.interface";
import { IBase } from "@inlaze_techlead/gannar-core";

export interface IRole extends IBase {
  readonly slug: string;
  readonly name: string;
  readonly permissions: IPermission[];
}
