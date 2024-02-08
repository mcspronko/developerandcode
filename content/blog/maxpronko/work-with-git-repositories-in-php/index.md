---
title: "Робота з Git репозиторіями в PHP"
date: "2024-02-08"
description: ""
---

Бібліотека `czproject/git-php` дозволяє працювати з git. Це зручно, коли необхідно створити застосунок мовою програмування PHP.

### Завантаження

Для того, щоб додати бібліотеку `czproject/git-php`, необхідно виконати наступну composer команду.

```bash
composer require czproject/git-php
```

## Використання

Клас `CzProject\GitPhp\Git` являється основним класом, який необхідний для роботи з git.

### Клонування репозиторію

```php
$git = new Git();
$gitRepoUrl = 'git@github.com/developerandcode/project.git';
$repoDirectory = '/var/www/html/';
$git->cloneRepository($gitRepoUrl, $repoDirectory);
```

### Отримання всіх git тегів репозиторію

```php
$git = new Git();
$repositoryPath = '/var/www/html/developerandcode/project';
$repository = $git->open($repositoryPath);
$tags = $repository->getTags();
```

### Ініціювання git репозиторію в директорії

```php
$git = new Git();
$repositoryPath = '/var/www/html/developerandcode/project';
$git->init($repositoryPath);
```

## Висновки

Бібліотека `czproject/git-php` дуже корисна у випадку, коли необхідно створити автоматизацію ваших проєктів, які знаходяться в git. У моїй практиці, я використовую цю бібліотеку для агрегації усіх репозиторіїв, які знаходяться на GitHub, та розміщення інформації всіх проєктів у файлі `satis.json`. 

Більш детально можна дізнатись про використання бібліотеки на офіційній сторінці у [GitHub](https://github.com/czproject/git-php).

[Підписуйтеся на канал "Спільнота програмістів - Developer & Code" в телеграмі](https://t.me/developerandcode)
