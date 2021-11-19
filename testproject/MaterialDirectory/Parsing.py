import requests
from bs4 import BeautifulSoup
import localFile as lF
dictionary_curse = []
dictionary_stock = []


def curse(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('td', class_="currency-table__large-text color-turquoise")
    items = soup.find('div', class_="currency-table__large-text")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text
        d = {
            'name': item_name,
            'price': item_price
        }
        dictionary_curse.append(d)


def stocks(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('h1', class_="text-2xl font-semibold instrument-header_title__GTWDv mobile:mb-2")
    items = soup.find_all('span', class_="instrument-price_last__KQzyA")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text
        d = {
            'name': item_name,
            'price': item_price
        }
        dictionary_stock.append(d)


[curse(curse_link) for curse_link in lF.curse_links]
[stocks(stock_link) for stock_link in lF.stock_links]

