---
title: "8. Страница Постов и пагинация. Блог на PHP"
date: "2021-06-16T10:00:00.284Z"
description: "В этом уроке, мы создадим страницу блога и перенесем вывод всех постов с главной страницы на отдельную страницу. Также мы добавим пагинацию для страницы Блог."
---

В этом уроке, продолжим создавать блог на PHP.
Создаем страницу блога и выводим страницы постов с пагинацией

## Какие темы мы разберем
В [Пишем Блог на PHP. Часть 8: Страница Постов и пагинация](https://www.youtube.com/watch?v=tucHRq8vLNc) уроке мы рассмотрим следующие темы:
* Добавим страницу со списком постов, которую можно будет увидеть перейдя по URI `/blog`
* Добавим возможность переходить по-странично с помощью дополнительного параметра `/blog/2`
* Поменяем реализацию метода `PostMapper::getList()` и добавим параметры пагинации
* Обновим нижнюю часть нашего сайта и добавим автора
* Выведем секцию "Последние посты" на главную страницу

Приятного просмотра:
`youtube:https://www.youtube.com/embed/tucHRq8vLNc`

В рамках урока, мы напишем следующий код. 

В главный файл `index.php` давайте добавим новый обработчик, который будет отдавать страницу по ссылке `/blog`. Также, мы предусмотрим возможность использовать параметр `page` для того, что бы показывать лимитированный список постов на странице.
Код нового обработчика, который необходимо добавить в файл `index.php`:

```php
<?php
$app->get(
    '/blog[/{page}]', 
    function (Request $request, Response $response, $args) 
        use ($view, $connection) {
        $latestPosts = new PostMapper($connection);
    
        $page = isset($args['page']) ? (int) $args['page'] : 1;
        $limit = 2;
    
        $posts = $latestPosts->getList($page, $limit, 'DESC');
    
        $body = $view->render(
            'blog.twig', 
            ['posts' => $posts]
        );
        $response->getBody()->write($body);
        return $response;
    }
);
```

Обновленный метод `PostMapper::getList()` получает новую сигнатуру метода. Дополнительные аргументы дают нам возможность делать выборку постов с заданным шагом и размером.
Прошу заметить, все 3 аргумента метода `getList()` не являются обязательными.

```php

/**
 * @param int $page
 * @param int $limit
 * @param string $direction
 * @return array|null
 * @throws Exception
 */
public function getList(
    int $page = 1, 
    int $limit = 2, 
    string $direction = 'ASC'
): ?array {
    if (!in_array($direction, ['DESC', 'ASC'])) {
        throw new Exception('The direction is not supported.');
    }

    $start = ($page - 1) * $limit;
    $statement = $this->connection->prepare(
        'SELECT * FROM post ORDER BY published_date ' . $direction .
        ' LIMIT ' . $start . ',' . $limit
    );

    $statement->execute();

    return $statement->fetchAll();
}
```

Обновленный шаблон `base.twig`, в котором мы добавим дополнительный контейнер и нижнюю часть сайта с именем автора:

```twig
<!doctype html>
<html lang="en">
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

  <title>Hello, world!</title>
</head>
<body>

{% include 'section/navigation.twig' %}
<div class="container">
  {% block body %}{% endblock %}
</div>

<footer class="footer bg-light p-3 mt-3">
  <div class="container">
    <span class="text-muted">© {{ "now"|date('Y') }} Max Pronko</span>
  </div>
</footer>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
</body>
</html>
```

Новый шаблон `section/blog.twig`, который будет отвечать за вывод страниц постов. 
Массив постов мы будем передавать с обработчика, который мы добавили в `index.php` файле.

```twig
{% extends 'base.twig' %}

{% block body %}
<h3 class="mb-3 mt-3">Blog</h3>
<div class="container">
  <div class="row">
    <div class="col-md-9">
      {% include 'section/posts.twig' with posts %}
      <div class="row">
        {% include 'section/pagination.twig' %}
      </div>
    </div>
    <div class="col-md-3">
      {% include 'section/about.twig' %}
    </div>
  </div>
</div>
{% endblock %}
```

На главной странице, мы будем выводить последние посты под заголовком Latest Posts.
Обновленный файл `index.twig` выглядит следующим образом.

```twig
{% extends 'base.twig' %}

{% block body %}
<h3 class="mb-3 mt-3">Latest Posts</h3>
<div class="container">
  <div class="row">
    <div class="col-md-9">
      {% include 'section/posts.twig' with posts %}
      <div class="row">
        <a href="/blog">View all</a>
      </div>
    </div>
    <div class="col-md-3">
      {% include 'section/about.twig' %}
    </div>
  </div>
</div>
{% endblock %}
```

Также, уберем дополнительный CSS-класс с шаблона `post.twig`. Обновленный шаблон ниже.

```twig
{% extends 'base.twig' %}

{% block body %}
  <div>
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

Новый шаблон `section/about.twig`.

```twig
<div class="container">
  <h4>About</h4>
  <p>Hello, my name is Max Pronko. I am a web developer and youtuber.</p>
</div>
```

Давайте добавим новую ссылку на страницу Blog в навигацию сайта. 
Обновленный шаблон `section/navigation.twig`.

```twig
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="/">Blog</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/blog">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Шаблон `section/pagination.twig`, который отвечает за верстку пагинации на странице Блог.

```twig
<nav aria-label="Blog pagination">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav> 
```

Шаблон `section/posts.twig`.

```twig
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
```

Скачать код данного урока можно по [ссылке](https://github.com/mcspronko/php-blog-lessons/tree/master/lesson-8).
