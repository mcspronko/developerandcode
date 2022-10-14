import date from 'date-and-time'
import 'date-and-time/locale/uk'

date.locale('uk')

const DateLocale = (inputDate) => {
  return date.format(new Date(Date.parse(inputDate)), 'MMM D, YYYY');
}

export default DateLocale
