import {
  LoggerConfigFinderService,
  LoggerService,
  loggerConfig,
  nodeConfig,
} from "@inlaze_techlead/inlaze-common";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { LoggerConfigModule } from "@app/shared/logger/logger-config.module";
import { Queue } from "bullmq";
import { BullModule, getQueueToken } from "@nestjs/bullmq";
import { LoggerQueueEvent } from "@app/shared/logger/bull/logger.event";
import { HttpModule } from "@nestjs/axios";
import { ILoggerMessage, LoggerProcessor, QueueEnum } from "@inlaze_techlead/gannar-core";

@Module({
  imports: [LoggerConfigModule, BullModule.registerQueue({ name: QueueEnum.LOGGER }), HttpModule],
  providers: [
    LoggerConfigFinderService,
    LoggerProcessor,
    LoggerQueueEvent,
    {
      provide: LoggerService,
      useFactory(
        loggerEnvConfig: ConfigType<typeof loggerConfig>,
        nodeEnvConfig: ConfigType<typeof nodeConfig>,
        loggerConfigFinderService: LoggerConfigFinderService,
        loggerQueue: Queue<ILoggerMessage>,
      ): LoggerService {
        const service = new LoggerService(
          loggerEnvConfig,
          nodeEnvConfig,
          loggerConfigFinderService,
        );
        service.cb = (data, loggerConfig): undefined =>
          void loggerQueue.add(
            QueueEnum.LOGGER,
            { message: data.message, loggerConfig },
            { removeOnComplete: true, removeOnFail: true },
          );

        return service;
      },
      inject: [
        loggerConfig.KEY,
        nodeConfig.KEY,
        LoggerConfigFinderService,
        getQueueToken(QueueEnum.LOGGER),
      ],
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {
  public static register({ isGlobal }: { isGlobal: boolean }): DynamicModule {
    return {
      module: LoggerModule,
      global: isGlobal,
    };
  }
}
