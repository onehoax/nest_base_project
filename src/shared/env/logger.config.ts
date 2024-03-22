import {
  StrictBooleanValidator,
  transformBoolean,
  transformDefault,
  validateEnvironment,
} from "@inlaze_techlead/gannar-core";
import { registerAs } from "@nestjs/config";
import { Type, Expose, Transform } from "class-transformer";
import { IsString, IsNotEmpty, Validate, IsNumber } from "class-validator";

export class LoggerEnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  public readonly LOG_PATH!: string;

  @Validate(StrictBooleanValidator)
  @Transform(({ value }: { value?: string | number }) => transformBoolean(value))
  @Expose()
  public readonly LOGGER!: boolean;

  @Validate(StrictBooleanValidator)
  @Transform(({ value }: { value?: string | number }) => transformBoolean(value))
  @Expose()
  public readonly HIGHLIGHT_LOGGER!: boolean;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  @Transform(({ value }) => transformDefault<number>(value as number, 4096))
  public readonly LOGGER_MAX_MESSAGE_LENGTH!: number;
}

export interface LoggerEnvironment {
  readonly logPath: string;
  readonly logger: boolean;
  readonly highlightLogger: boolean;
  readonly loggerMaxMessageLength: number;
}

export default registerAs("logger", (): LoggerEnvironment => {
  const env = validateEnvironment<LoggerEnvironmentVariables>(
    process.env,
    LoggerEnvironmentVariables,
  );

  return {
    logPath: env.LOG_PATH,
    logger: env.LOGGER,
    highlightLogger: env.HIGHLIGHT_LOGGER,
    loggerMaxMessageLength: env.LOGGER_MAX_MESSAGE_LENGTH,
  };
});
