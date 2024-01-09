from bs4 import BeautifulSoup
import requests
import json
import os

url = 'http://iost.tu.edu.np/notices'
response = requests.get(url, verify=False)
soup = BeautifulSoup(response.text, 'html.parser')

notices = []

links = soup.find_all('div', class_='recent-post-wrapper shdow')

for link in links:
    title = link.find('h5').text.strip()
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
