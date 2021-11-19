import requests
from bs4 import BeautifulSoup
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

[curse(curse_link) for curse_link in curse_links]
[stocks(stock_link) for stock_link in stock_links]
