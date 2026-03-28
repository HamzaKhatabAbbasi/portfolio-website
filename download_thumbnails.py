import urllib.request
import re
import os

urls = {
    "cert_tableau.jpg": "https://www.coursera.org/account/accomplishments/verify/1JCLBES1H8PK",
    "cert_ml.jpg": "https://www.coursera.org/account/accomplishments/verify/ZBDRW3UTZDKG",
    "cert_eda.jpg": "https://www.coursera.org/account/accomplishments/verify/7TSQM9K65JBR",
    "cert_powerbi.jpg": "https://www.coursera.org/account/accomplishments/verify/VVVJ99EK3GO9",
    "cert_dataviz.jpg": "https://www.coursera.org/account/accomplishments/verify/CO69P3SYI838",
    "cert_sql.jpg": "https://www.coursera.org/account/accomplishments/verify/T20KEKEHDQTJ"
}

os.makedirs("images", exist_ok=True)

for name, url in urls.items():
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Extended regex to handle order of attributes
        match = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', html)
        if not match:
             match = re.search(r'<meta[^>]*content="([^"]+)"[^>]*property="og:image"', html)
        
        if match:
            img_url = match.group(1)
            print(f"Found image URL: {img_url}")
            urllib.request.urlretrieve(img_url, f"images/{name}")
            print(f"Saved {name}")
        else:
            print(f"No og:image found for {name}")
    except Exception as e:
        print(f"Error on {name}: {e}")
