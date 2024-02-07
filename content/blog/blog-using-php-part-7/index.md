---
title: "7. Выводим Последние посты. Блог на PHP"
date: "2021-05-10T13:00:00.284Z"
description: "В этом уроке, продолжим создавать блог на PHP. Мы изменим структуру индексной страницы и выведем последние 3 поста. Также мы добавим реальную картинку поста, путь картинки хранится в базе данных постов."
---

В этом уроке, продолжим создавать блог на PHP. 
Мы изменим структуру индексной страницы и выведем последние 3 поста. Также мы добавим реальную картинку поста, путь картинки хранится в базе данных постов.

## Какие темы мы разберем
В [Пишем Блог на PHP. Часть 7: Latest Posts](https://www.youtube.com/watch?v=ubIN46zted0) уроке мы рассмотрим следующие темы:
* Как лимитировать массив постов с базы данных и показать последние 3 поста на главной странице
* Изменим структуру главной страницы

Приятного просмотра:
`youtube:https://www.youtube.com/embed/ubIN46zted0`

В рамках урока, мы напишем следующий код. 

Класс `LatestPosts`, который отвечает за загрузку последних постов. С помощью аргумента `$limit` метода `get()` мы сможем контролировать количество постов.

```php
<?php

declare(strict_types=1);

namespace Blog;

use PDO;

class LatestPosts
{
    /**
     * @var PDO
     */
    private PDO $connection;

    /**
     * LatestPosts constructor.
     * @param PDO $connection
     */
    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param int $limit
     * @return array|null
     */
    public function get(int $limit): ?array
    {
        $statement = $this->connection->prepare(
            'SELECT * FROM post ' 
            . 'ORDER BY published_date ' 
            . 'DESC LIMIT ' . $limit
        );

        $statement->execute();

        return $statement->fetchAll();
    }
}
```

Обновленная функция по обработке главной страницы:
```php
// index.php
use Blog\LatestPosts;

$app->get('/', function (Request $request, Response $response) 
    use ($view, $connection) {
    $latestPosts = new LatestPosts($connection);
    $posts = $latestPosts->get(3);

    $body = $view->render('index.twig', [
        'posts' => $posts
    ]);
    $response->getBody()->write($body);
    return $response;
});
```

Файл `public/.htaccess`:

```bash
Options -Indexes

<IfModule mod_php7.c>
php_flag engine 0
</IfModule>
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

Обновленный файл `templates/index.twig`:

```twig
{% extends 'base.twig' %}

{% block body %}
<div class="container">
  <h3 class="mb-3 mt-3">Latest Posts</h3>
  <div class="row">
    <div class="col-md-9">
      {% for post in posts %}
        <div class="row mb-2 bg-light" style="border: 1px solid #ddd;">
          <div class="p-3">
            {% if post.image_path is not null %}
              <img src="{{ post.image_path }}" class="card-img-top" alt="{{ post.title|escape }}">
            {% endif %}
            <div class="mt-3">
              <a href="/{{ post.url_key }}"><h5 class="card-title">{{ post.title|escape }}</h5></a>
              <span class="text-muted">Max Pronko | {{ post.published_date|date("F d, Y") }}</span>
              <p class="mt-2">{{ post.description|escape }}</p>
              <a href="/{{ post.url_key }}" class="">Read more</a>
            </div>
          </div>
        </div>
      {% endfor %}
      <div class="row">
        <a href="/blog">View all</a>
      </div>
    </div>
    <div class="col-md-3">
      <div class="container">
        <h4>About</h4>
        <p>Hello, my name is Max Pronko. I am a web developer and youtuber.</p>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```

Обновленный файл `templates/post.twig`:

```twig
{% extends 'base.twig' %}

{% block body %}
  <div class="container">
    {% if post.image_path is not null %}
      <img src="{{ post.image_path }}" class="img-fluid" alt="{{ post.title|escape }}">
    {% endif %}
    <h1 class="mt-3 mb-3">{{ post.title|escape }}</h1>
    <div class="container mb-3">
      <div class="row">
        <span class="text-muted">Max Pronko | {{ post.published_date|date("F d, Y") }}</span>
      </div>
    </div>
    <div>
      {{ post.content|raw }}
    </div>
  </div>
{% endblock %}
```

Скачать код данного урока можно по [ссылке](https://github.com/mcspronko/php-blog-lessons/tree/master/lesson-7).

[Підписуйтеся на канал "Спільнота програмістів - Developer & Code" в телеграмі](https://t.me/developerandcode)
