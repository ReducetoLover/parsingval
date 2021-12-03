from .forms import TaskForm
from django.shortcuts import render, redirect
import csv
from django.http import HttpResponse


def index(request):
    return render(request, 'main/index.html', {'title': 'Главная страница'})


def about(request):
    return render(request, 'main/about.html', {'title': 'About'})


def stock(request):
    return render(request, 'main/stock.html', {'title': 'Акции'})


def currency(request):
    return render(request, 'main/currency.html', {'title': 'Валюты'})


def chart(request):
    return render(request, 'main/chart.html', {'title': 'Chart'})


def saving_currency(request):
    return render(request, 'main/saving_currency.html', {'title': 'Saving currency  '})


def saving_stocks(request):
    return render(request, 'main/saving_stocks.html', {'title': 'Saving stocks'})


def curse_csv(request):
    return render(request, 'main/Curse.csv', {'title': 'Curse'})


def stock_csv(request):
    return render(request, 'main/Stock.csv', {'title': 'Stock'})


def run(request):
    if request.method == 'POST' and 'script' in request.POST:
        from .Parsing import run
        run()


def create(request):
    error = ''
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
        else:
            error = 'Form is incorrect!'

    form = TaskForm()
    context = {
        'form': form,
        'error': error
    }
    return render(request, 'main/create.html', context)
