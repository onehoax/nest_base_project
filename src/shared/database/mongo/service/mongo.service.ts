import { mongoConfig } from "@app/shared/env";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { MongooseModuleFactoryOptions } from "@nestjs/mongoose";

@Injectable()
export class MongoService {
  public constructor(
    @Inject(mongoConfig.KEY)
    private readonly _mongoConfig: ConfigType<typeof mongoConfig>,
  ) {}

  public get template(): MongooseModuleFactoryOptions {
    return {
      maxPoolSize: 5,
    };
  }

  public get gannarDbConfig(): MongooseModuleFactoryOptions {
    return {
      ...this.template,
      uri: this._mongoConfig.uri,
      dbName: this._mongoConfig.dbName,
    } as MongooseModuleFactoryOptions;
  }
}
