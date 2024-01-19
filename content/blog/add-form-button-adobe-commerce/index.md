---
title: "Як додати кнопку до форми в Adobe Commerce"
date: "2022-10-17"
description: "За допомогою кнопок, користувач може контролювати зміни на сторінці з формою. Давайте розглянемо приклад додавання кнопок в форму адмінки Adobe Commerce платформи."
---

За допомогою кнопок, користувач може контролювати зміни на сторінці з формою. Давайте розглянемо приклад додавання кнопок в форму адмінки Adobe Commerce платформи.

В цьому пості, ми розберемо створення кнопок збереження даних форми та повернення користувача назад.

![Кнопки Save та Back](/new-buttons.png)

Основою цього посту ми будемо використовувати розширення Блог для Adobe Commerce. Код можна знайти за посиланням в [GitHub](https://github.com/mcspronko/magento2-blog-module).

## Конфігурація кнопки
Форма в Adobe Commerce має свою конфігурацію. Ця конфігурація, в основному, складна та важко запам'ятовувана. 

Що необхідно знати про форму. По-перше, конфігурація форми розташована в XML файлі. Це одна з фішечок Adobe Commerce, яка дозволяє іншим розширенням робити зміни форми, без прямого перепису конфігураційного файлу. Зручно. Але не практично з точки зору створення самої форми. 

По-друге, кожна кнопка форми має свій PHP клас. Знову ж таки, зручно мати окремий клас для кнопки, так як це дає змогу створити складний тип кнопки. Як, наприклад, кнопка створення продукту. 

![Кнопка додавання продукту](/add-product-button.png)

Повертаючись до конфігурації кнопки. Синтаксис додавання кнопки в компонент форми доволі простий.

Іксемель нода `<button />`, має два обов'язкових атрибута. Атрибут `name` відповідає за унікальне ім'я в контексті форми. Атрибут `class` дає змогу задекларувати PHP клас, який відмалює саму кнопку.
```xml
<button name="" class="" />
```

Кнопка має бути частиною ноди `<buttons />`. Це дає змогу відмалювати нескінченну (в теорії) кількість кнопок для форми.

```xml
<buttons>
  <button name="" class="" />
</buttons>
```

Ми додамо дві кнопки. Кнопка "Save" буде відповідати відправку HTTP POST запроса з данними форми. А кнопка "Back", в свою чергу, буде редіректити користувача зі сторінки форми на сторінку списку постів.

Приклад конфигурації кнопок для форми з двома кнопками save та back.
```xml
<buttons>
  <button name="save" 
    class="MageMastery\Blog\Block\Adminhtml\Post\Edit\SaveButton" />
  <button name="back" 
    class="MageMastery\Blog\Block\Adminhtml\Post\Edit\BackButton" />
</buttons>
```

Дана конфігурація має бути розміщена в файлі конфігурації компонента форми, а саме як дочірній конфіг `<settings />`.

В файлі `magemastery_blog_post_form.xml`, давайте розмістимо конфігурацію кнопок.

```xml
<?xml version="1.0"?>
<form>
    <!-- аргументи форми ... -->
    <!-- налаштування форми -->
    <settings>
        <buttons>
            <button name="save" class="MageMastery\Blog\Block\Adminhtml\Post\Edit\SaveButton" />
            <button name="back" class="MageMastery\Blog\Block\Adminhtml\Post\Edit\BackButton" />
        </buttons>
    </settings>
    <!-- продовження ... -->
</form>
```

З конфігурацією ми вирішили, давайте перейдемо до написання коду PHP.

## PHP Клас кнопки Save

Нам треба створити два пі-ейч-пі класи для кнопок. Почнемо з класу `SaveButton`. Будь-який клас для кнопки має реалізувати інтерфейс `ButtonProviderInterface` та метод даного інтерфесу під назвою `getButtonData()`.

Реалізація класу `SaveButton` з методом `getButtonData()` нижче.
```php
<?php

declare(strict_types=1);

namespace MageMastery\Blog\Block\Adminhtml\Post\Edit;

use Magento\Framework\View\Element\UiComponent\Control\ButtonProviderInterface;

class SaveButton implements ButtonProviderInterface
{
    public function getButtonData(): array
    {
        return [
            'label' => __('Save'),
            'class' => 'save primary',
            'sort_order' => 20,
            'data_attribute' => [
                'mage-init' => [
                    'button' => ['event' => 'save']
                ],
                'form-role' => 'save'
            ],
        ];
    }
}
```

По факту, клас відповідальний за відмалювання `<button />`. Але, використання класу дає нам можливість вплинути на атрибути кнопки перед тим, як така кнопка буде відмальована. Знову ж таки, зручно, коли є більше одного модуля в системі, який відповідає за одну ту ж саму кнопку.

```html
<button id="save-button" title="Save" 
        class="action-default primary" 
        data-ui-id="save-button">
  <span>Save</span>
</button>
```

Давайте перейдемо до створення кнопки Back.

## PHP Клас кнопки Back

Клас `BackButton` реалізує інтерфейс `ButtonProviderInterface`, а також наслідує клас `GenericButton`.
Клас `GenericButton` буде реалізований нижче, але суть цього класу в тому, щоб надати спільний доступ до методу `getUrl()`.

```php
<?php

declare(strict_types=1);

namespace MageMastery\Blog\Block\Adminhtml\Post\Edit;

use Magento\Framework\View\Element\UiComponent\Control\ButtonProviderInterface;

class BackButton extends GenericButton 
    implements ButtonProviderInterface
{
    public function getButtonData(): array
    {
        return [
            'label' => __('Back'),
            'on_click' => sprintf(
                "location.href = '%s'", 
                $this->getBackUrl()
            ),
            'class' => 'back',
            'sort_order' => 10,
        ];
    }

    private function getBackUrl(): string
    {
        return $this->getUrl('*/*/');
    }
}
```

Для реалізації повернення користувача назад на сторінку списку постів, ми використовуємо `location.href` та метод `getBackUrl()`.

```php
'on_click' => sprintf(
    "location.href = '%s'", 
    $this->getBackUrl()
),
```

Для реалізації методу `getBackUrl()` ми використовуємо метод `getUrl()` класу `GenericButton`. 
Сигнатура метода `getUrl()` наступна:
```php 
getUrl(string $route = '', array $params = [])
```

Як аргумент `$route` передаємо `'*/*/'`. Це означає, що при створення лінки необхідно використати поточний роут та локацію контролера відносно модулю Blog.
Також, можна було написати замість `'magemastery_blog/edit/'` або `'magemastery_blog/edit/index'`.

## Додатковий клас GenericButton

Реалізація класу `GenericButton` дуже проста. Нам необхідно використати інтерфейс `UrlInterface`. 
В конструкторі при запуску кода підтягнеться конкретний клас-реалізація даного інтерфейсу. 

Метод `getUrl()` являє собою проксі метод для виклику також за сигнатурою метода `getUrl()`, але вже з інтерфейсу `UrlInterface`. 

```php
<?php declare(strict_types=1);

namespace MageMastery\Blog\Block\Adminhtml\Post\Edit;

use Magento\Framework\UrlInterface;

class GenericButton
{
    public function __construct(
       private UrlInterface $url
    ) {}

    public function getUrl(
        string $route = '', 
        array $params = []
    ): string {
        return $this->url->getUrl($route, $params);
    }
}
```

Звичайно ж, можна було не створювати `GenericButton` клас, а одразу додати залежність в клас `BackButton`. Але це було зроблено для того, щоб не додавати такі самі конструктори для нових класів кнопок, таких як `DeleteButton`.

Також, до вашого перегляду створив відео версію даного посту.
`youtube:https://www.youtube.com/embed/0Egv_zfD1co`

Ну от і все, ми додали з вами 3 класи для створення та відображення кнопок Back та Save. Також, ми додали конфігурацію в форму, щоб кнопки відмалювались.

[Підписуйтеся на канал Спільнота програмістів - Developer & Code в телеграмі](https://t.me/developerandcode)
