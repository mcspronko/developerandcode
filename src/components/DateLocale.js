import date from 'date-and-time';
import 'date-and-time/locale/ru';

date.locale('ru');

const DateLocale = (inputDate) => {
  return date.format(new Date(Date.parse(inputDate)), 'D MMMM YYYY');
}

export default DateLocale
