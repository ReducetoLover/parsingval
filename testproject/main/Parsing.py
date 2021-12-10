import itertools
import os

import jsonify as jsonify
import requests
from bs4 import BeautifulSoup
import datetime as dt
import csv
import sqlite3
import pandas as pd
import json
dictionary_curse = []
dictionary_stock = []
MAIN_PATH = 'templates/main/'
FILE_STOCKS = 'templates/main/Stock.csv'
FILE_CURSE = 'templates/main/Curse.csv'


def save_jsons(name, result):
    curs = {}
    for company, orders_iter in itertools.groupby(result, key=lambda r: r[1]):
        orders = list(orders_iter)
        #print(orders)
        dates = []
        values = []
        valutes = []
        c = ""
        for x in orders:
            dates.append(x[0])
            c = x[1]
            values.append(x[3])
            valutes.append(x[2])
        cur = {'dates': dates, 'values': values, 'valutes': valutes}
        # print(cur)
        curs[c] = cur

    print(json.dumps(curs))
    with open(name, 'w', encoding='utf-8') as file:
        file.write(json.dumps(curs))

def query_jsons(name):
    conn = sqlite3.connect('parsing.db')
    c = conn.cursor()
    all = c.execute('''SELECT * FROM {} ORDER BY Name'''.format(name)).fetchall()
    week = c.execute('''SELECT * FROM {} WHERE DATE(Date) > date('now', '-7 days') ORDER BY Name'''.format(name)).fetchall()
    year = c.execute('''SELECT * FROM {} WHERE DATE(Date) > date('now', '-365 days') ORDER BY Name'''.format(name)).fetchall()

    #print(json.dumps(r))

    #print(all)
    #print('---------------------')
    #print(sorted(all, key=lambda r: r[0]))

    save_jsons('{0}{1}_all.json'.format(MAIN_PATH,name), all)
    save_jsons('{0}{1}_week.json'.format(MAIN_PATH,name), week)
    save_jsons('{0}{1}_year.json'.format(MAIN_PATH,name), year)



def save_file(items, path):
    with open(path, 'w', newline='', encoding="utf-8") as file:
        writer = csv.writer(file, delimiter=',')

        writer.writerow(['Date', 'Name', 'Valute', 'Price'])
        for item in items:
            writer.writerow([item['date'], item['name'], item['currency'], item['price']])

    conn = sqlite3.connect('parsing.db')
    c = conn.cursor()

    curse = pd.read_csv(FILE_CURSE,low_memory=False)
    stock = pd.read_csv(FILE_STOCKS,low_memory=False)

    curse.to_sql('curse', conn, if_exists='append', index = False, chunksize = 10000)
    stock.to_sql('stock', conn, if_exists='append', index = False, chunksize = 10000)

    query_jsons('curse')
    query_jsons('stock')


def curse(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('td', class_="currency-table__large-text color-turquoise")
    items = soup.find('div', class_="currency-table__large-text")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text.replace(",", ".")
        d = {
            'date': dt.date.today(),
            'name': item_name,
            'currency': '₽',
            'price': item_price
        }
        dictionary_curse.append(d)


def stocks(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    short_name = soup.find('h1', class_="text-2xl font-semibold instrument-header_title__GTWDv mobile:mb-2")
    items = soup.find('span', class_="text-2xl")
    for i in items:
        item_name = short_name.text.strip()
        item_price = i.text.replace(",", ".")
        d = {
            'date': dt.date.today(),
            'name': item_name,
            'currency': '$',
            'price': item_price
        }
        dictionary_stock.append(d)


stock_links = ['https://ru.investing.com/equities/american-express',
'https://ru.investing.com/equities/amgen-inc',
'https://ru.investing.com/equities/3m-co',
'https://ru.investing.com/equities/apple-computer-inc',
'https://ru.investing.com/equities/boeing-co',
'https://ru.investing.com/equities/caterpillar',
'https://ru.investing.com/equities/chevron',
'https://ru.investing.com/equities/coca-cola-co',
'https://ru.investing.com/equities/dow-chemical',
'https://ru.investing.com/equities/goldman-sachs-group',
'https://ru.investing.com/equities/home-depot',
'https://ru.investing.com/equities/honeywell-intl',
'https://ru.investing.com/equities/ibm',
'https://ru.investing.com/equities/intel-corp',
'https://ru.investing.com/equities/johnson-johnson',
'https://ru.investing.com/equities/jp-morgan-chase',
'https://ru.investing.com/equities/mcdonalds',
'https://ru.investing.com/equities/merck---co',
'https://ru.investing.com/equities/microsoft-corp',
'https://ru.investing.com/equities/nike',
'https://ru.investing.com/equities/procter-gamble',
'https://ru.investing.com/equities/salesforce-com',
'https://ru.investing.com/equities/the-travelers-co',
'https://ru.investing.com/equities/united-health-group',
'https://ru.investing.com/equities/verizon-communications',
'https://ru.investing.com/equities/visa-inc',
'https://ru.investing.com/equities/walgreen-co',
'https://ru.investing.com/equities/wal-mart-stores',
'https://ru.investing.com/equities/disney',
'https://ru.investing.com/equities/ford-motor-co',
'https://ru.investing.com/equities/nvidia-corp',
'https://ru.investing.com/equities/cisco-sys-inc',
'https://ru.investing.com/equities/vale-s.a.--americ',
'https://ru.investing.com/equities/pfizer',
'https://ru.investing.com/equities/bank-of-america',
'https://ru.investing.com/equities/activision-inc',
'https://ru.investing.com/equities/gen-motors',
'https://ru.investing.com/equities/tesla-motors',
'https://ru.investing.com/equities/us-steel-corp',
'https://ru.investing.com/equities/micron-tech',
'https://ru.investing.com/equities/transocea-ltd',
'https://ru.investing.com/equities/western-union',
'https://ru.investing.com/equities/discovery-communications-(c)',
'https://ru.investing.com/equities/altria-group',
'https://ru.investing.com/equities/cabot-oil---gas',
'https://ru.investing.com/equities/jet-blue',
'https://ru.investing.com/equities/oracle-corp',
'https://ru.investing.com/equities/amazon-com-inc',
'https://ru.investing.com/equities/philip-morris-intl',
'https://ru.investing.com/equities/starbucks-corp']

curse_links = ['https://www.banki.ru/products/currency/usd/',
'https://www.banki.ru/products/currency/pln/',
'https://www.banki.ru/products/currency/aud/',
'https://www.banki.ru/products/currency/azn/',
'https://www.banki.ru/products/currency/byn/',
'https://www.banki.ru/products/currency/bgn/',
'https://www.banki.ru/products/currency/eur/',
'https://www.banki.ru/products/currency/gbp/',
'https://www.banki.ru/products/currency/chf/',
'https://www.banki.ru/products/currency/brl/']


def run():
    [curse(curse_link) for curse_link in curse_links]
    save_file(dictionary_curse, FILE_CURSE)
    [stocks(stock_link) for stock_link in stock_links]
    save_file(dictionary_stock, FILE_STOCKS)

#run()
