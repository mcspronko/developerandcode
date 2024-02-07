---
title: "5. MySQL и Post Mapper. Блог на PHP"
date: "2020-12-15T13:00:00.284Z"
description: "В этом уроке, мы подключим MySQL базу данных, создадим таблицу для страниц постов блога и загрузим пост на страницу поста. Также, мы выведем пост на страницу используя Post Mapper класс."
---

Мы добрались до базы данных. В этом уроке, мы подключим MySQL базу данных, создадим таблицу для страниц постов блога и загрузим пост на страницу поста.
Мы будем использовать PDO библиотеку, которая даст нам возможность подключиться к базе данных постов и загрузить пост по идентификатору.

Как мы помним с части 4, где мы добавили страницу поста и создали маршрут для этой страницы, у нас будет возможность использовать URL для поста в формате `/hello-world`, вместо `/post/1`.
Данная поддержка даст нам хороший SEO результат, когда блог будет индексироваться поисковыми ботами. 

Также, мы создадим класс, который отвечает за загрузку данных поста по идентификатору `url_key`. 
Мы рассмотрим и реализуем загрузку пост сущности используя [Data Mapper](https://designpatternsphp.readthedocs.io/ru/latest/Structural/DataMapper/README.html) паттерн проектирования.

## Какие темы мы разберем
В [Пишем Блог на PHP. Часть 5: MySQL и Post Mapper](https://www.youtube.com/watch?v=de5vsUxMp1g) уроке мы рассмотрим следующие темы:
* Как пользоваться классом [PDO](https://www.php.net/manual/en/book.pdo.php) для подключения к базе данных
* Создадим таблицу `post` и добавим записи в эту таблицу
* Добавим `ext-pdo` зависимость в composer.json проекта
* Реализуем Post Mapper класс для загрузки поста по url_key полю
* Отрисуем загруженный пост на странице
* Создадим шаблон страницы 404, в случае, если поста нет в базе данных
* Разберем экранирование данных

Как обещал в видео, прикрепляю SQL запросы на создание базы данных, создание таблицы `post` и добавление записей в таблицу.

Скрипт создания базы данных:
```sql
/* 1. Create database */
CREATE DATABASE blog_php;
```

Скрипт создания таблицы `post`:
```sql
/* 2. Create posts table */
CREATE TABLE `post` (
  `post_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `url_key` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `content` text,
  `description` varchar(255) DEFAULT NULL,
  `published_date` datetime NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `url_key` (`url_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Добавим 3 поста в таблицу `post`:
```sql
/* 3. Add 3 posts into the posts table */
INSERT INTO post (title, url_key, content, description, published_date) VALUES ('Hello World', 'hello-world', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.', 'My first blog post', '2020-12-05 12:00:00');
INSERT INTO post (title, url_key, content, description, published_date) VALUES ('Second post', 'second-post', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.','2020-12-09 12:00:00');
INSERT INTO post (title, url_key, content, description, published_date) VALUES ('My third post', 'my-third-post', 'There are many variations of passages of Lorem Ipsum available', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don''t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.','2020-12-10 12:00:00');
```

Приятного просмотра:
`youtube:https://www.youtube.com/embed/de5vsUxMp1g`

Скачать код данного урока можно по [ссылке](https://github.com/mcspronko/php-blog-lessons/tree/master/lesson-5).

[Підписуйтеся на канал "Спільнота програмістів - Developer & Code" в телеграмі](https://t.me/developerandcode)
