export interface INotificationService {
  requestPermissions(): Promise<boolean>;
  scheduleNotification(title: string, body: string, seconds?: number): Promise<string>;
}