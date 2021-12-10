"""testproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import views
from django.urls import path, include


urlpatterns = [
    path('', views.index, name='home'),
    path('create', views.create, name='create'),
    path('stock', views.stock, name='stock'),
    path('currency', views.currency, name='currency'),
    path('chart', views.chart, name='chart'),
    path('saving_currency', views.saving_currency, name='saving_currency'),
    path('saving_stocks', views.saving_stocks, name='saving_stocks'),
    path('curse_csv', views.curse_csv, name='curse_csv'),
    path('stock_csv', views.stock_csv, name='stock_csv'),

    path('curse_json_all', views.curse_json_all),
    path('curse_json_year', views.curse_json_year),
    path('curse_json_week', views.curse_json_week),
    path('stock_json_all', views.stock_json_all),
    path('stock_json_year', views.stock_json_year),
    path('stock_json_week', views.stock_json_week),

    path('admin/', views.running, name='running'),
]
