from django.shortcuts import render
from .models import task
from .forms import TaskForm
from django.shortcuts import render, redirect


# Create your views here.

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

