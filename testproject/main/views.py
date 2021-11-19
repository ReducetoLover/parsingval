from django.shortcuts import render
from .forms import TaskForm
from django.shortcuts import render, redirect
from .models import Curse, Stocks, task
from testproject.MaterialDirectory.Parsing import dictionary_curse, dictionary_stock

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


def saving_currency():
    cur = Curse()
    for d in dictionary_curse:
        cur.price = d['name']
        cur.currency = d['price']
        cur.save()


def saving_stocks():
    stocks = Stocks()
    for d in dictionary_stock:
        stocks.price = d['name']
        stocks.currency = d['price']
        stocks.save()
