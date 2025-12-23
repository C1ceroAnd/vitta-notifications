import { INotificationService } from "../model/services/INotificationService";

export class SendNotificationUseCase {
  constructor(private readonly notificationService: INotificationService) {}

  async notifyNutritionistNewRequest(patientName: string): Promise<void> {
    const hasPermission = await this.notificationService.requestPermissions();
    if (!hasPermission) throw new Error("Sem permissão para notificações");

    await this.notificationService.scheduleNotification(
      "Nova Solicitação de Consulta 📅",
      `O paciente ${patientName} solicitou um novo agendamento.`
    );
  }

  async notifyPatientStatus(status: 'accepted' | 'rejected' | 'canceled'): Promise<void> {
    const hasPermission = await this.notificationService.requestPermissions();
    if (!hasPermission) throw new Error("Sem permissão para notificações");

    let title = "";
    let body = "";

    switch (status) {
      case 'accepted':
        title = "Consulta Confirmada! ✅";
        body = "Sua consulta foi aceita pela nutricionista.";
        break;
      case 'rejected':
        title = "Consulta Recusada ❌";
        body = "Infelizmente sua consulta não pôde ser aceita neste horário.";
        break;
      case 'canceled':
        title = "Consulta Cancelada ⚠️";
        body = "Sua consulta agendada foi cancelada.";
        break;
    }

    await this.notificationService.scheduleNotification(title, body);
  }
}