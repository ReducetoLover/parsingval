from django.contrib import admin
from .models import task, Curse, Stocks


admin.site.register(task)
admin.site.register(Stocks)
admin.site.register(Curse)
admin.site.site_title = "Панель админимтартора"
admin.site.site_header = "Панель админимтартора"
