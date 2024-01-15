---
title: "Python Числа та Типи"
date: "2024-01-11"
description: "Давайте розбиратися, як працювати з числами у Python. З числами ми будемо працювати досить часто, тому необхідно зрозуміти які типи та можливості є у нас в арсеналі."
---

Давайте розбиратися, як працювати з числами у Python. З числами ми будемо працювати досить часто, тому необхідно зрозуміти які типи та можливості є у нас в арсеналі.

Python трактує числа по різному, залежно від того, як і коли числа використовуються.

Що це означає?

Давайте спочатку розберемось з цілими числами у мові програмування Python.

## Цілі Числа

Цілі числа або також відомі як Integer.

Приклад:
```python
3
```

Нічого особливого, окрім наступного прикладу.

Виявляється, у мові програмування Python, великі числа можна задавати з використанням символу `_`.

```python
million = 3_000_000
```

При виводі такого значення, ми все одно отримуємо ціле число.

```python
>>> print(million)
3000000
```

## Плаваючі Числа

Плаваючі числа, або float, так само в Python працюють, як і в JavaScript.

Буває, що все точно на зрозуміло:
```python
>>> 0.2 + 0.2
0.4
```

А буває, результат, який необхідно перед виводом для кінцевого користувача, оброблювати.

```python
>>> 0.1 + 0.2
0.30000000000000004
```

## Константи

Як виявилось, для мене, що у мові програмування Python немає вбудованих констант. Як, наприклад в PHP. 
Але правила задавання користувацьких констант, такі ж самі, як і в PHP.

Давайте розглянемо приклад константи.

```python
ONE_HOUR = 3600
```

Усі операці ділення, множення, додавання та віднімання працюють як з цілими так і з плаваючими числами. Цікаво, а слово float так і перекладається, як "плаваюче"?

# Підсумок

У цьому дописі, ми розглянули доступні числові типи у мові програмування Python. А саме, цілі числа, плаваючі, та навіть розібралися з константами. Виявилось, що вбудованих констант у Python немає, але свої константи ми можемо створювати.