from django.db import models


class Curse(models.Model):
    """Создание и описание таблицы валют."""
    date = models.DateField("Дата", auto_now=True)
    price = models.IntegerField("Цена")
    rub = models.CharField("Валюта покупки", default='₽', max_length=2)  # За какую валюту, покупается валюта
    currency = models.CharField("Валюта продажи", max_length=20)  # Валюта, которую мы покупаем


class Stocks(models.Model):
    """Создание и описание таблицы акций."""
    date = models.DateField("Дата", auto_now=True)
    price = models.IntegerField("Цена")
    dlr = models.CharField("Валюта покупки", default='$', max_length=2)  # За какую валюту, покупаются акции
    currency = models.CharField("Акции", max_length=20)   # Акции, которые мы покупаем


class task(models.Model):
    title = models.CharField('title', max_length=50)
    task = models.TextField('description')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'
