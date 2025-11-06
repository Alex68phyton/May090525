import userPaymentPlanJsonData from "@data/userPaymentPlanStatuses.json";
import crmUserPaymentPlanJsonData from "@data/crmUserPaymentPlanStatus.json"


export type DbStatus = typeof userPaymentPlanJsonData[keyof typeof userPaymentPlanJsonData];
export type CrmStatus = typeof crmUserPaymentPlanJsonData[keyof typeof crmUserPaymentPlanJsonData];


export function getCrmStatusByDbStatus(dbStatus: DbStatus): CrmStatus {
  switch (dbStatus) {
    case userPaymentPlanJsonData.created:
      return crmUserPaymentPlanJsonData.created;
    
    case userPaymentPlanJsonData.current:
      return crmUserPaymentPlanJsonData.active;
    
    case userPaymentPlanJsonData.freezed:
      return crmUserPaymentPlanJsonData.freezed;

    case userPaymentPlanJsonData.notStarted:
      return crmUserPaymentPlanJsonData.notStarted;

    case userPaymentPlanJsonData.paymentPending:
      return crmUserPaymentPlanJsonData.paymentPending;
    
    default:
      return handleUnknownStatus(dbStatus);
  }
}

function handleUnknownStatus(dbStatus: string): CrmStatus {
  console.warn(`Неизвестный статус БД: ${dbStatus}. Возвращаем статус по умолчанию.`);
  return crmUserPaymentPlanJsonData.active;
}
 