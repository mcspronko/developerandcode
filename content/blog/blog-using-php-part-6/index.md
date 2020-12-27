---
title: "Пишем Блог на PHP. Часть 6: Выводим список постов с базы данных"
date: "2020-12-27T13:00:00.284Z"
description: "В этом уроке, мы выведем список постов с базы данных на главную страницу. Мы научимся с вами, как работать с коллекцией данных, которая будет загружена из хранилища базы данных MySQL."
---

В этом уроке, мы выведем список постов с базы данных на главную страницу.
Мы научимся с вами, как работать с коллекцией данных, которая будет загружена из хранилища базы данных MySQL.

Для этого, мы используем главную страницу и выведем все посты, которые у нас сохранены в базе данных.
Стоит заметить, что мы используем существующий класс `PostMapper` для рассширения возможности работы с таблицей `post`. 
И добавим новый метод в класс `PostMapper::getList()`. 

Метод `getList` будет отвечать за выгрузку всех данных с таблицы `post`. Также, мы позаботимся о том, что б наши выгруженные посты показывались в правильном порядке. А именно исходя из даты добавления поста. Мы воспользуемся встроенной возможностью `MySQL` и добавим сортировку по полю `published_date`.

## Какие темы мы разберем
В [Пишем Блог на PHP. Часть 6: Выводим список постов с базы данных](https://www.youtube.com/watch?v=de5vsUxMp1g) уроке мы рассмотрим следующие темы:
* Как загружать все посты и выводить на главную страницу
* Напишем запрос для возвращения постов с сортировкой по дате
* Разберем, как выводить по три поста в ряду с использованием переменных `Twig`

Приятного просмотра:
`youtube:https://www.youtube.com/embed/de5vsUxMp1g`

В рамках урока, мы напишем следующий код. 

Функция по обработке и отрисовке главной страницы:
```php
// index.php

$app->get(
    '/', 
    function (Request $request, Response $response, $args) 
        use ($view, $postMapper) 
    {
        $posts = $postMapper->getList('DESC');
    
        $body = $view->render('index.twig', [
            'posts' => $posts
        ]);
        $response->getBody()->write($body);
        return $response;
    }
);
```

Шаблон `index.twig` главной страницы:

```twig
{% extends 'base.twig' %}

{% block body %}
<div class="container">
  <h1 class="mb-3 mt-3">Welcome to my Blog!</h1>
  {% set rowCount = 1 %}
  {% for post in posts %}
    {% if rowCount == 1 %}
      <div class="container row">
    {% endif %}
      <div class="p-1">
        <div class="card" style="width: 18rem;">
          <img src="https://dummyimage.com/300x200/5b76ba/ffffff" class="card-img-top" alt="{{ post.title|escape }}">
          <div class="card-body">
            <a href="/{{ post.url_key }}"><h5 class="card-title">{{ post.title|escape }}</h5></a>
            <p class="card-text">{{ post.description|escape }}</p>
            <a href="/{{ post.url_key }}" class="">Read more</a>
          </div>
        </div>
      </div>
    {% set rowCount = rowCount + 1 %}
    {% if rowCount == 1 %}
      </div>
    {% endif %}
    {% if rowCount > 3 %}
      {% set rowCount = 1 %}
    {% endif %}
  {% endfor %}
</div>
{% endblock %}
```

Метод `getList()` класса `PostMapper`:
```php
public function getList(string $direction): ?array
{
    if (!in_array($direction, ['DESC', 'ASC'])) {
        throw new Exception('The direction is not supported.');
    }
    $statement = $this->connection
        ->prepare(
            'SELECT * FROM post ORDER BY published_date ' 
            . $direction
        );

    $statement->execute();

    return $statement->fetchAll();
}
```

Скачать код данного урока можно по [ссылке](https://github.com/mcspronko/php-blog-lessons/tree/master/lesson-6).
