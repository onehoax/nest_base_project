import { LoggerService } from "@inlaze_techlead/inlaze-common";
import { QueueEventsListener } from "@nestjs/bullmq";
import { ILoggerMessage, CustomQueueEvents, QueueEnum } from "@inlaze_techlead/gannar-core";

@QueueEventsListener(QueueEnum.LOGGER)
export class LoggerQueueEvent extends CustomQueueEvents<ILoggerMessage> {
  public constructor(private readonly loggerService: LoggerService) {
    super(loggerService);
  }
}
