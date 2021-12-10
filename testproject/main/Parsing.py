import requests
from bs4 import BeautifulSoup
import datetime as dt
import csv
dictionary_curse = []
dictionary_stock = []
FILE_STOCKS = 'main/templates/main/Stock.csv'
FILE_CURSE = 'main/templates/main/Curse.csv'


def save_file(items, path):
    with open(path, 'a+', newline='', encoding="utf-8") as file:
        writer = csv.writer(file, delimiter=';')
        writer.writerow(['Дата', 'Название', 'Валюта', 'Цена'])
        for item in items:
            writer.writerow([item['date'], item['name'], item['currency'], item['price']])


def curses():
    url = 'https://www.banki.ru/products/currency/cb/'
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    container = soup.select_one('tbody')
    items = container.find_all('tr')
    valuti = []
    for item in items:
        name = item.find('td').text.strip()
        price = item.contents[7].text.strip()
        d = {
            'date': dt.date.today(),
            'name': name,
            'currency': '₽',
            'price': price
        }
        valuti.append(d)
    return valuti


def stocks():
    url = 'https://companiesmarketcap.com/usa/largest-companies-in-the-usa-by-market-cap/'
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    container = soup.select_one('tbody')
    items = container.find_all('tr')
    akcii = []
    for item in items:
        name = item.find('div', {'class': 'company-name'}).text.strip()
        price = item.contents[7].text.strip()[1:]
        d = {
            'date': dt.date.today(),
            'name': name,
            'currency': '$',
            'price': price
        }
        akcii.append(d)
    return akcii


def run():
    save_file(curses(), FILE_CURSE)
    save_file(stocks(), FILE_STOCKS)
