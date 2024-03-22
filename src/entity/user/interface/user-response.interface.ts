import { IUser } from "@app/entity/user/interface/user.interface";

export interface IUserResponse extends Omit<IUser, "password" | "refreshToken"> {}
