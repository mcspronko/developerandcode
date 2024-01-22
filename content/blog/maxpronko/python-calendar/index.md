---
title: "Python: Модуль calendar"
date: "2024-01-22"
description: "У цьому дописі ви дізнаєтесь про Python модуль під назвою calendar. Календар можна використовувати для форматування дат, календарів, виконувати різні операції над числами календаря."
---

У цьому дописі ви дізнаєтесь про Python модуль під назвою calendar, або календар. Календар можна використовувати для форматування дат, календарів, виконувати різні операції над числами календаря.
Також, можна вивести календар у форматі HTML або у текстовому вигляді, щоб потім використати результат на веб застосунках.

Давайте більш детально розглянемо модуль calendar.

## Що таке calendar?

Модуль `calendar` дозволяє виводити календар у стилі Unix cal програми. Модуль надає доступ до класу `Calendar`, за допомогою якого можна виводити, налаштовувати дати на екран.

## Як встановити модуль?

Модуль `calendar` йде разом з Python, і тому цей модуль доступний одразу ж після встановлення Python.

Все, що необхідно зробити, це імпортувати модуль у свою програму.

Файл `my_calendar.py`:
```python
import calendar
```

Після того, як модуль додали до файлу, можемо вивести результат.

```python
import calendar

print(calendar.month(2025, 11))
```

Результат:

```bash
   November 2025
Mo Tu We Th Fr Sa Su
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
```

Також, можна змінити перший день тижня, наприклад, неділя.
Для цього, необхідно налаштувати перший день тижня календаря.

```python
import calendar

# Перший день тижня
calendar.setfirstweekday(calendar.SUNDAY)

print(calendar.month(2025, 11))
```

```bash
   November 2025
Su Mo Tu We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30
```

Модуль `calendar` має різні функції, наприклад, можна перевірити, чи являється рік високосним.

```python
import calendar

print(calendar.isleap(2024))
```

Результат:
```bash
True
```

Але просто виводити календарі в терміналі не дуже цікаво, інша справа, коли необхідно вивести календар на вебсторінці.
Для цього, можемо налаштувати формат виводу календаря як HTML.

```python
import calendar

html_calendar = calendar.HTMLCalendar()

print(html_calendar.formatmonth(2024, calendar.FEBRUARY))
```
Функція `HTMLCalendar` повертає об'єкт класу `HTMLCalendar` у змінну `html_calendar`, який потім використовується для того, щоб вивести місяць у форматі HTML.

Результат:
```html
<table border="0" cellpadding="0" cellspacing="0" class="month">
<tr><th colspan="7" class="month">February 2024</th></tr>
<tr><th class="mon">Mon</th><th class="tue">Tue</th><th class="wed">Wed</th><th class="thu">Thu</th><th class="fri">Fri</th><th class="sat">Sat</th><th class="sun">Sun</th></tr>
<tr><td class="noday">&nbsp;</td><td class="noday">&nbsp;</td><td class="noday">&nbsp;</td><td class="thu">1</td><td class="fri">2</td><td class="sat">3</td><td class="sun">4</td></tr>
<tr><td class="mon">5</td><td class="tue">6</td><td class="wed">7</td><td class="thu">8</td><td class="fri">9</td><td class="sat">10</td><td class="sun">11</td></tr>
<tr><td class="mon">12</td><td class="tue">13</td><td class="wed">14</td><td class="thu">15</td><td class="fri">16</td><td class="sat">17</td><td class="sun">18</td></tr>
<tr><td class="mon">19</td><td class="tue">20</td><td class="wed">21</td><td class="thu">22</td><td class="fri">23</td><td class="sat">24</td><td class="sun">25</td></tr>
<tr><td class="mon">26</td><td class="tue">27</td><td class="wed">28</td><td class="thu">29</td><td class="noday">&nbsp;</td><td class="noday">&nbsp;</td><td class="noday">&nbsp;</td></tr>
</table>
```

Таким чином, Python модуль `calendar` можна використовувати без сторонніх модулів та відформатувати дати у будь-якому форматі.
Також, можна вивести календар у форматі HTML або у текстовому вигляді, щоб потім використати результат на веб застосунках.

[Підписуйтеся на канал Спільнота програмістів - Developer & Code в телеграмі](https://t.me/developerandcode)
