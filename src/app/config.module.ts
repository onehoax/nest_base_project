import { RoleModule } from "@app/entity/role/role.module";
import { DatabaseModule } from "@app/shared/database/database.module";
import { MongoService } from "@app/shared/database/mongo/service/mongo.service";
import { EnvVarInterface } from "@app/shared/env/env.var.interface";
import { AllExceptionsFilter } from "@app/shared/filter/exception.filter";
import { AccessTokenGuard } from "@app/shared/guard/access-token.guard";
import { PermissionGuard } from "@app/shared/guard/permission.guard";
import { ResponseInterceptor } from "@app/shared/interceptor/response.interceptor";
import { JwtCustomModule } from "@app/shared/jwt/jwt-custom.module";
import { LoggerModule } from "@app/shared/logger/logger.module";
import { BullModule } from "@nestjs/bullmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModuleFactoryOptions, MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    // Logger
    LoggerModule.register({ isGlobal: true }),
    // Mongo
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      inject: [MongoService],
      useFactory: (mongoService: MongoService): MongooseModuleFactoryOptions =>
        mongoService.gannarDbConfig,
    }),
    // Redis
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvVarInterface, true>) => ({
        connection: {
          host: configService.get("REDIS_HOST"),
          port: configService.get("REDIS_PORT"),
        },
      }),
    }),
    JwtCustomModule,
    RoleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class ConfigModule {
  public static register({ isGlobal }: { isGlobal: boolean }): DynamicModule {
    return {
      module: ConfigModule,
      global: isGlobal,
    };
  }
}
