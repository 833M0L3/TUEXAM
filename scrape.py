from bs4 import BeautifulSoup
import requests
import json
import os
import urllib3
from requests.exceptions import ConnectTimeout

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url = 'https://iost.tu.edu.np/notices'

try:
    response = requests.get(url, verify=False, timeout=10)
    response.raise_for_status()
except ConnectTimeout as e:
    print(f"Error: Connection to {url} timed out.")
    exit()
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
    exit()

soup = BeautifulSoup(response.text, 'html.parser')

notices = []

links = soup.find_all('li', class_="me-4")

for link in links:
    title = link.find('a').text.strip()
    notice_link = link.find('a')['href'].strip()

    notice_data = {
        'title': title,
        'link': notice_link
    }

    notices.append(notice_data)

output_file_path = 'notices.json'

if os.path.exists(output_file_path):
    os.remove(output_file_path)

with open(output_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(notices, json_file, indent=2, ensure_ascii=False)

print(f"Output written to {output_file_path}")
