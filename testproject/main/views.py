from .forms import TaskForm
from django.shortcuts import render, redirect
from .Parsing import run


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





def curse_json_all(request):
    return render(request, 'main/curse_all.json')
def curse_json_week(request):
    return render(request, 'main/curse_week.json')


def stock_json_all(request):
    return render(request, 'main/stock_all.json')
def stock_json_week(request):
    return render(request, 'main/stock_week.json')





def running(request):
    if request.method == 'POST':
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
