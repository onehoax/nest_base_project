import { CustomDecorator, SetMetadata } from "@nestjs/common";

export const IS_TOKEN_REFRESH_KEY: string = "isTokenRefresh";
export const TokenRefresh = (): CustomDecorator => SetMetadata(IS_TOKEN_REFRESH_KEY, true);
