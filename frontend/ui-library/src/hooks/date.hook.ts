import 'dayjs/locale/uk';
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);

type DateType = (date?: dayjs.ConfigType) => dayjs.Dayjs;
export const useDate = (): DateType => dayjs;
