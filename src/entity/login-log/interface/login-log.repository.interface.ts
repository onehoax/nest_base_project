import { ILoginLog } from "@app/entity/login-log/interface/login-log.interface";

export interface ILoginLogRepository {
  findAll: () => Promise<ILoginLog[]>;
  create: (loginLogCreateDto: Partial<ILoginLog>) => Promise<ILoginLog>;
}

export const LOGIN_LOG_REPOSITORY = Symbol("LOGIN_LOG_REPOSITORY");
