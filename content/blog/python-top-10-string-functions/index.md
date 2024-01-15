---
title: "ТОП 10 Python функцій роботи з текстом"
date: "2024-01-10"
description: "Продовжуємо вивчення мови програмування Python. У цьому дописі розглянемо функції роботи з текстом."
---

Продовжуємо вивчення мови програмування Python. У цьому дописі розглянемо функції роботи з текстом.

У Python можливо викликати функції як частина змінної, яка зберігає текстове представлення значення.

Наприклад, ми маємо текстову змінну `text`:
```py
text = "Вчимо Python Українською"
```

Виклик функції відбувається тоді, коли до змінної додається крапка, назва функції, та фігурні дужки.

```py
text.title()
```

## Python Функції Роботи з Текстом

### 1. Python Функція title()
Першою Python функцією у списку роботи з рядками розглянемо `title()`. 
Функція `title()` змінює кожну першу літеру в тексті.   

```python
text = "вчимо python українською!"
print(text.title())
```

Результат:
```python
Вчимо Python Українською!
```

Таким чином, ми можемо зробити з рядка заголовок тексту. Зручно у випадку, якщо в базі даних збережений текст, і необхідно підготувати заголовок посту, або адресу користувача інтернет-магазину.

### 2. Python Функція capitalize()

Беремо ту саму змінну з текстом та викликаємо `capitalize()`. Отримуємо тільки першу літеру першого слова змінену.

```python
Вчимо python українською!
```

Python функція `capitalize()` не тільки змінює першу літеру рядку у верхній регістр, але й змінює всі інші літери тексту в нижній регістр.
Давайте розглянемо інший текст.

```python
text = "вЧИМО PYTHON УКРАЇНСЬКОЮ!"
print(text.capitalize())
```

Отримуємо дуже гарне речення, щиро українське та правильно написане.

```python
Вчимо python українською!
```

### 3. Python Функція upper()

Python фунція `upper()` навпаки змінює весь текст у верхній регістр.

```python
text = "Вчимо Python Українською!"
print(text.upper())
```

Результат:
```python
ВЧИМО PYTHON УКРАЇНСЬКОЮ!
```

### 4. Python Функція swapcase()

Python фунція `swapcase()` змінює регістр тексту на зворотній.

```python
text = "Вчимо Python Українською!"
print(text.swapcase())
```

Результат:
```python
вЧИМО pYTHON уКРАЇНСЬКОЮ!
```

### 5. Python Функція strip()

Python фунція `strip()` допомагає почистити текст від зайвих пустих символів на початку та у кінці тексту.
Це буде у нагоді у випадку обробки вхідних даних користувача сайту при заповнені форми.

```python
text = "     м. Київ, вул. Тараса Шевченка  "
print(text.strip())
```

Результат:
```python
м. Київ, вул. Тараса Шевченка
```

Маємо гарну адресу, яку далі можна зберігати, або показувати на сторінці сайту.

### 6. Python Функція replace()

Python фунція `replace()` допомагає змінити частину тексту. Якщо у вас є текст, в якому треба замінити символ, або слово, або фразу. З цим допоможе функція `replace()`.

Функція приймає два аргументи. Перший аргумент, це текст, який ми шукаємо замінити, а другий аргумент, це текст на який ми хочемо замінити старий текст.
```python
text = "Вчимо PHP!"
print(text.replace('PHP', 'Python'))
```

Результат:
```python
Вчимо Python!
```

### 7. Python Функція startswith()

Python фунція `startswith()` допомагає визначити, чи є початком тексту визначене у цій функції слово або текст.

Наприклад, є посилання на сайт, в якому необхідно визначити, чи є протокол.
```python
text = "https://www.developerandcode.com/"
print(text.startswith('https://'))
```

Результат:
```python
True
```

### 8. Python Функція split()

Python фунція `split()` допомагає розбити текст за визначеним символом. Результатом такого виклику буде список.
Про списки в мові програмування Python ми поговоримо далі.

```python
text = "courses/python-101/introduction"
print(text.split('/'))
```

Результат:
```python
['courses', 'python-101', 'introduction']
```

### 9. Python Функція rsplit()

Python фунція `rsplit()` допомагає розділити текст за визначеним параметром, або за пустим символом. Ця функція дуже схожа на функцію `split()`, яку ми обговорили вище, за однією умовою. Функція `rsplit()` дозволяє вказати другим аргументом `maxsplit`, що дасть змогу зупинити функцію після визначеної кількості разів.

```python
text = "Вивчаємо Python українською!"
print(text.rsplit(' ', 1))
```

Результат:
```python
['Вивчаємо Python', 'українською!']
```

Або ж без аргументів:
```python
print(text.rsplit())
```
Результат:
```python
['Вивчаємо', 'Python', 'українською!']
```


Також, `rsplit()` як і `split()` дозволяє використати символ для пошуку в тексті. За замовчуванням, це пустий символ, або пробіл. 

### 10. Python Функція rindex()

Python функція `rindex()` знаходить під-текст в тексті. Результатом виклику функції буде індекс початку під-тексту, знайденого в тексті, або помилка `ValueError`. 

Функція приймає 3 аргументи:
1. під-текст, який необхідно знайти в тексті
2. індекс початоку пошуку
3. кінцевий індекс пошуку

```python
text = "Вивчаємо Python українською!"
print(text.rindex('Pyt', 1, 20))
```

Результат:
```python
9
```

Індекс в Python починається з 0, тому 9 символ в тексті це літера "P".

## Висновок

Таким чином, ми вже знаємо деякі функції роботи з рядками та текстом у мові програмування Python. Зрозуміло, що цих функції більше, і необхідно приділити деякий час, щоб всі текстові функції спробувати.