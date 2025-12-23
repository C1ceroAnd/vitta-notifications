import { useState } from 'react';
import { sendNotificationUseCase } from '../di/container';

export function useNotificationTestViewModel() {
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const triggerNutritionistNotification = async () => {
    try {
      setLoading(true);
      await sendNotificationUseCase.notifyNutritionistNewRequest("João Silva");
      setLastAction('Notificação para Nutricionista enviada');
    } catch (error) {
      console.error(error);
      setLastAction('Erro ao enviar notificação');
    } finally {
      setLoading(false);
    }
  };

  const triggerPatientNotification = async (status: 'accepted' | 'rejected' | 'canceled') => {
    try {
      setLoading(true);
      await sendNotificationUseCase.notifyPatientStatus(status);
      setLastAction(`Notificação de status '${status}' enviada`);
    } catch (error) {
      console.error(error);
      setLastAction('Erro ao enviar notificação');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    lastAction,
    triggerNutritionistNotification,
    triggerPatientNotification
  };
}