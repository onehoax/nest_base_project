import { IUserResponse } from "@app/entity/user/interface/user-response.interface";
import { IUser } from "@app/entity/user/interface/user.interface";

export interface IUserRepository {
  findOne: (id: string) => Promise<IUser | null>;
  findByUsernameOrEmail: (userName?: string, email?: string) => Promise<IUser | null>;
  findAll: () => Promise<IUserResponse[]>;
  // TODO - implement with criteria filters
  // findMany: (criteria: Criteria) => Promise<IUserResponse[]>;
  // getTotal: (criteria: Criteria) => Promise<number>
  create: (roleCreateDto: Partial<IUser>) => Promise<IUserResponse>;
  update: (id: string, roleUpdateDto: Partial<IUser>) => Promise<number>;
  updateRefreshToken: (id: string, token: string) => Promise<number>;
  updateLastLogin: (id: string) => Promise<number>;
  delete: (id: string) => Promise<number>;
}

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
