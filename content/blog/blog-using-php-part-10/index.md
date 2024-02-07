---
title: "10. Пагинация постов. Блог на PHP"
date: "2021-06-20T10:00:00.284Z"
description: "В этом уроке, мы добавим возможность перелистывать блог страницу. Для этого, мы создадим новую реализацию компонента навигации."
---

## Какие темы мы разберем
В [10. Пагинация постов - Блог на PHP](https://www.youtube.com/watch?v=MUB8JH9igWc), уроке мы рассмотрим следующие темы:
* Создадим функцию `getTotalCount()` для получения общего количества постов в базе данных
* Добавим параметры для обработки разных страниц


Приятного просмотра:
`youtube:https://www.youtube.com/embed/MUB8JH9igWc`

В рамках урока, мы напишем следующий код.

Обновленный обработчик для `/blog/{page}` добавим в файл `index.php`. В шаблон `blog.twig` передадим параметр `pagination`, 
в котором будет текущая страница и шаг страницы.

```php
$app->get('/blog[/{page}]', 
    function (Request $request, Response $response, $args) 
    use ($view, $connection) {
    $postMapper = new PostMapper($connection);

    $page = isset($args['page']) ? (int) $args['page'] : 1;
    $limit = 2;

    $posts = $postMapper->getList($page, $limit, 'DESC');

    $totalCount = $postMapper->getTotalCount();
    $body = $view->render('blog.twig', [
        'posts' => $posts,
        'pagination' => [
            'current' => $page,
            'paging' => ceil($totalCount / $limit),
        ],
    ]);
    $response->getBody()->write($body);
    return $response;
});
```

Добавим новый метод `getTotalCount()` в класс `PostMapper`.
```php
public function getTotalCount(): int
{
    $statement = $this->connection->prepare(
        'SELECT count(post_id) as total FROM post'
    );

    $statement->execute();

    return (int) ($statement->fetchColumn() ?? 0);
}
```

В шаблоне `blog.twig` необходимо передать параметр `pagination` для шаблона `section/navigation.twig`.

```html
{% include 'section/pagination.twig' with pagination %}
```

И статический шаблон `section/pagination.twig` перепишем с использованием нового параметра `pagination`.

```html
<nav aria-label="Blog pagination">
    <ul class="pagination">
        {% if pagination.current > 1 %}
        <li class="page-item">
            <a class="page-link" 
               href="{{ url('blog/' ~ (pagination.current - 1)) }}"
            >Previous</a>
        </li>
        {% endif %}
        {% for page in 1..pagination.paging %}
        <li class="page-item {% if pagination.current == page %} active {% endif %}">
            <a class="page-link" 
               href="{{ url('blog/' ~ page) }}"
            >{{ page }}</a>
        </li>
        {% endfor %}
        {% if pagination.current < pagination.paging %}
        <li class="page-item">
            <a class="page-link" 
               href="{{ url('blog/' ~ (pagination.current + 1)) }}"
            >Next</a>
        </li>
        {% endif %}
    </ul>
</nav>
```

Скачать код данного урока можно по [ссылке](https://github.com/mcspronko/php-blog-lessons/tree/master/lesson-10).

[Підписуйтеся на канал "Спільнота програмістів - Developer & Code" в телеграмі](https://t.me/developerandcode)
