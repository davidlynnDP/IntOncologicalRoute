import { es } from 'date-fns/locale';
import { toZonedTime, formatInTimeZone, toDate, format } from "date-fns-tz";

export const BOGOTA_TIMEZONE = 'America/Bogota';

export const UTCDatesToBogotaTimeZone = (date: Date) => {

  const bogotaTime = toZonedTime(date, BOGOTA_TIMEZONE);
  return formatInTimeZone(bogotaTime, BOGOTA_TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
}

export const convertDateToBogotaTime = (dateInput: string | Date): Date => {

  return toDate(dateInput, { timeZone: BOGOTA_TIMEZONE });
};

export const getCurrentDateInBogotaFormat = (): string => {

  const now = new Date();
  const zonedDate = toZonedTime(now, BOGOTA_TIMEZONE);
  const formattedDate = format(zonedDate, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es });
  return formattedDate;
};

export const getBogotaTimestamp = (): string => {
  const now = new Date();
  const bogotaTime = toZonedTime(now, BOGOTA_TIMEZONE);
  return format(bogotaTime, 'yyyy-MM-dd HH:mm:ss');
};
