import { validateEnvironment } from "@inlaze_techlead/gannar-core";
import { registerAs } from "@nestjs/config";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class JwtEnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @Type(() => String)
  public readonly JWT_ACCESS_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @Type(() => String)
  public readonly JWT_ACCESS_EXPIRATION_TIME!: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @Type(() => String)
  public readonly JWT_REFRESH_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @Type(() => String)
  public readonly JWT_REFRESH_EXPIRATION_TIME!: string;
}

export interface JwtEnvironment {
  readonly accessTokenSecret: string;
  readonly accessTokenExpire: string;
  readonly refreshTokenSecret: string;
  readonly refreshTokenExpire: string;
}

export default registerAs("jwt", (): JwtEnvironment => {
  const env = validateEnvironment<JwtEnvironmentVariables>(process.env, JwtEnvironmentVariables);

  return {
    accessTokenSecret: env.JWT_ACCESS_SECRET,
    accessTokenExpire: env.JWT_ACCESS_EXPIRATION_TIME,
    refreshTokenSecret: env.JWT_REFRESH_SECRET,
    refreshTokenExpire: env.JWT_REFRESH_EXPIRATION_TIME,
  };
});
