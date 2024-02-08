---
title: "Що Нового в jQuery 4.0.0 Beta"
date: "2024-02-07"
description: "Несподівана новина у світі JavaScript. Нова версія jQuery 4.0.0 Beta вийшла у світ. Розглянемо детальніше, що нам чекати."
---

Моє знайомство з jQuery сталося десь у 2009-2010 році. Ніколи не міг уявити, що буду читати про нову версію jQuery десь у далекому 2024 році. Особливо коли у світі JavaScript новий фреймворк народжується кожні три місяці.

Може з трьома місяцями я звичайно перебільшив, але десь так виглядають релізи нових версій у світі JavaScript.

З іншого боку, дуже багато сайтів досі використовують jQuery бібліотеку. У світі електронної комерції, Magento Open Source платформа для досі використовує jQuery бібліотеку. У той самий час, Shopware відмовилась від jQuery починаючи з версії 6.5. 

WordPress, яка являється найбільшою PHP системою керування контентом для створення сайтів, також використовує jQuery.

Що тут додати, світ підсів на jQuery і ще довго буде сидіти.

## Пресреліз

Отже, ми маємо пресреліз для jQuery 4.0.0 Beta. Що цікавого можна помітити.

По-перше, це перший реліз у 2024 році від jQuery команди. Попередній реліз jQuery був аж наприкінці серпня 2023 та світ отримав [jQuery 3.7.1](https://blog.jquery.com/2023/08/28/jquery-3-7-1-released-reliable-table-row-dimensions/).

jQuery 4.0.0 Beta охоплює покращення швидкодії, фікс помилок та деякі несумісні зміни. Також, було видалено досить багато старого коду та API.

### Internet Explorer 10 та старіші версії

Як ми могли здогадатись, jQuery бібліотека не могла постійно підтримувати Internet Explorer браузер зі своєю логікою. jQuery 4.0.0 повністю перестає підтримувати браузери Internet Explorer 10 та нижче. Як не дивно, це дало змогу зменшити розмір бібліотеки аж на цілих 867 gzip байт.

### А що ж з іншими старими браузерами

Також, у jQuery 4.0.0 немає підтримки старих браузерів Edge Legacy, iOS версій нижче 11, Firefox версій нижче 65, та Android Browser. 

## Видалені Застарілі API

Наступні функції були видалені починаючи з версії jQuery 4.0.0.

* jQuery.cssNumber
* jQuery.cssProps
* jQuery.isArray
* jQuery.parseJSON
* jQuery.nodeName
* jQuery.isFunction
* jQuery.isWindow
* jQuery.camelCase
* jQuery.type
* jQuery.now
* jQuery.isNumeric
* jQuery.trim
* jQuery.fx.interval

Я пам'ятаю, що використовував декілька з цих видалених функцій у себе на проєкті.

## Видалені функції push, sort, та splice

Функції push, sort та splice також видалені вже з версії jQuery 4.0.0. 

## Що ще змінилось

Це звичайно не весь список змін jQuery 4.0.0 Beta. Команда jQuery обіцяє оновити список, щоб нам було що порозбирати. 
Ось ще декілька змін, які увійшли в Beta:
- додалась підтримка `FormData`
- видалена автоматична підтримка JSONP
- jQuery переїхала на ES модулі... нарешті
- додали підтримку Trusted Types

## Де Можна Завантажити jQuery 4.0.0 Beta

Наразі, останню версію jQuery можна завантажити з CDN.

[https://code.jquery.com/jquery-4.0.0-beta.js](https://code.jquery.com/jquery-4.0.0-beta.js)

[https://code.jquery.com/jquery-4.0.0-beta.min.js](https://code.jquery.com/jquery-4.0.0-beta.min.js)

Також, можна використати `npm`:

```bash
npm install jquery@4.0.0-beta
```

Ознайомитись з пресрелізом англійською мовою можна [тут](https://blog.jquery.com/2024/02/06/jquery-4-0-0-beta/). 

## Висновки

Цікаво звичайно, як буде розвиватись jQuery та адаптація усіх плагінів та застосунків, які використовують версії jQuery 3.x та нижче. Будемо спостерігати за новинами та освоювати нові версії.

[Підписуйтеся на канал "Спільнота програмістів - Developer & Code" в телеграмі](https://t.me/developerandcode)