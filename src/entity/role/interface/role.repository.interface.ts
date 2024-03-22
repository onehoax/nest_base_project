import { IRole } from "@app/entity/role/interface/role.interface";

export interface IRoleRepository {
  findOne: (id: string) => Promise<IRole | null>;
  findAll: () => Promise<IRole[]>;
  findByName: (name: string) => Promise<IRole | null>;
  create: (roleCreateDto: Partial<IRole>) => Promise<IRole>;
  update: (id: string, roleUpdateDto: Partial<IRole>) => Promise<number>;
  delete: (id: string) => Promise<number>;
}

export const ROLE_REPOSITORY = Symbol("ROLE_REPOSITORY");
