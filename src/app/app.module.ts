import { LoggerMiddleWare } from "@app/shared/middleware/logger.middleware";
import { MiddlewareConsumer, NestModule, Module } from "@nestjs/common";
import { ConfigModule } from "@app/app/config.module";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { HealthModule } from "@app/health/health.module";
import { DatabaseModule } from "@app/shared/database/database.module";
import { getEnvFilePath } from "@inlaze_techlead/gannar-core";
import { jwtConfig, loggerConfig, mongoConfig, nodeConfig } from "@app/shared/env";
import { PermissionModule } from "@app/entity/permission/permission.module";
import { RoleModule } from "@app/entity/role/role.module";
import { UserModule } from "@app/entity/user/user.module";
import { BcryptModule } from "@app/shared/bcrypt/bcrypt.module";
import { AuthModule } from "@app/shared/auth/auth.module";
import { JwtCustomModule } from "@app/shared/jwt/jwt-custom.module";
import { LoginLogModule } from "@app/entity/login-log/login-log.module";
import { LoggerConfigModule } from "@app/shared/logger/logger-config.module";
import { LoggerModule } from "@app/shared/logger/logger.module";
import { I18nModule } from "@app/shared/i18n/i18.module";

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: getEnvFilePath("env/"),
      isGlobal: true,
      load: [nodeConfig, loggerConfig, mongoConfig, jwtConfig],
    }),
    ConfigModule.register({ isGlobal: true }),
    LoggerModule,
    I18nModule,
    HealthModule,
    DatabaseModule,
    LoggerConfigModule,
    BcryptModule,
    JwtCustomModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    UserModule,
    LoginLogModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleWare).forRoutes("*");
  }
}
