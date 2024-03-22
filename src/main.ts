import { AppModule } from "@app/app/app.module";
import { EnvironmentEnum } from "@inlaze_techlead/gannar-core";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const globalPrefix: string = "api";
  const appName: string = "Gannar Backoffice";
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  app.enableCors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  });

  app.use(cookieParser());

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>("PORT") ?? 3001;
  const env: EnvironmentEnum =
    configService.get<EnvironmentEnum>("NODE_ENV") ?? EnvironmentEnum.DEVELOPMENT;

  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${appName} App Documentation`)
    .setVersion("0.1")
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);

  if (env !== EnvironmentEnum.PRODUCTION) {
    const swaggerPrefix: string = "docs";
    const swaggerSorter: string = "alpha";
    SwaggerModule.setup(swaggerPrefix, app, document, {
      swaggerOptions: {
        tagsSorter: swaggerSorter,
        operationsSorter: swaggerSorter,
      },
    });

    Logger.debug(
      `Swagger docs is running on: http://localhost:${port}/${swaggerPrefix}`,
      bootstrap.name,
    );
  }

  await app.listen(port);
  Logger.debug(`Application is running on http://localhost:${port}/${globalPrefix}`);
}

void bootstrap();
