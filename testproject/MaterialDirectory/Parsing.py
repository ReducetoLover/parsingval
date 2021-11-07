import requests
from bs4 import BeautifulSoup
from localFile import intro_currency, curse_links_bankiru, curse_links_rbc, intro_stock, stock_links


def curse_rbc(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('span', class_="chart__info__name-short")
    items = soup.find_all('span', class_="chart__info__sum")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text
        print(f'{item_name} за {item_price}')


def curse_bankiru(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('td', class_="currency-table__large-text color-turquoise")
    items = soup.find('div', class_="currency-table__large-text")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text
        print(f'{item_name} за {item_price}')


def stock(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('div', class_="main-title main-title_light js-company")
    items = soup.find_all('span', class_="chart__info__sum")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text
        print(f'{item_name} за {item_price}')


# print(intro_currency)
# [curse_rbc(curse_link) for curse_link in curse_links_rbc]
# [curse_bankiru(curse_link) for curse_link in curse_links_bankiru]
# print(intro_stock)
# [stock(stock_link) for stock_link in stock_links]
