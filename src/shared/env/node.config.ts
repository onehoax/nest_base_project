import {
  EnvironmentEnum,
  transformDefault,
  validateEnvironment,
} from "@inlaze_techlead/gannar-core";
import { registerAs } from "@nestjs/config";
import { Type, Expose, Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NodeEnvironmentVariables {
  @IsEnum(EnvironmentEnum)
  @Expose()
  @Transform(({ value }) =>
    transformDefault<EnvironmentEnum>(value as EnvironmentEnum, EnvironmentEnum.DEVELOPMENT),
  )
  public readonly NODE_ENV!: EnvironmentEnum;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  @Transform(({ value }) => transformDefault<number>(value as number, 3000))
  public readonly PORT!: number;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Transform(({ value }) => transformDefault<string>(value as string, "localhost"))
  @Expose()
  public readonly HOST!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  @Transform(({ value }) => transformDefault<string>(value as string, "America/Bogota"))
  public readonly TIMEZONE!: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  @Transform(({ value }) => transformDefault<number>(value as number, 50000))
  public readonly REQUEST_TIMEOUT!: number;
}

export interface NodeEnvironment {
  readonly nodeEnv: EnvironmentEnum;
  readonly port: number;
  readonly host: string;
  readonly timezone: string;
  readonly requestTimeout: number;
}

export default registerAs("node", (): NodeEnvironment => {
  const env = validateEnvironment<NodeEnvironmentVariables>(process.env, NodeEnvironmentVariables);

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    host: env.HOST,
    timezone: env.TIMEZONE,
    requestTimeout: env.REQUEST_TIMEOUT,
  };
});
