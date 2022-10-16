const DateLocale = (inputDate) => {
  const month = [
    'Січень', 'Лютий', 'Березень',
    'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень',
    'Жовтень', 'Листопад', 'Грудень'
  ];

  const date = new Date(Date.parse(inputDate))
  const monthName = month[date.getMonth()];

  return monthName + ' ' + date.getDate() + ', ' + date.getFullYear()
}

export default DateLocale
