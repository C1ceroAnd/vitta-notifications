import * as Notifications from 'expo-notifications';
import { INotificationService } from '../../model/services/INotificationService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class ExpoNotificationService implements INotificationService {
  async requestPermissions(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  }

  async scheduleNotification(title: string, body: string, seconds: number = 2): Promise<string> {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
      },
      trigger: {
        seconds: seconds,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        repeats: false 
      },
    });
    return identifier;
  }
}