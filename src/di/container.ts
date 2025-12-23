import { ExpoNotificationService } from "../infra/notifications/ExpoNotificationService";
import { SendNotificationUseCase } from "../usecase/SendNotificationUseCase";
import { INotificationService } from "../model/services/INotificationService";

const notificationService: INotificationService = new ExpoNotificationService();

const sendNotificationUseCase = new SendNotificationUseCase(notificationService);

export {
  notificationService,
  sendNotificationUseCase
};