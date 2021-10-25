from django.db import models

# Create your models here.
class task(models.Model):
    title = models.CharField('title', max_length = 50)
    task = models.TextField('description')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'