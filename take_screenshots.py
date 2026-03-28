from playwright.sync_api import sync_playwright

urls = {
    "cert_tableau.jpg": "https://www.coursera.org/account/accomplishments/verify/1JCLBES1H8PK",
    "cert_ml.jpg": "https://www.coursera.org/account/accomplishments/verify/ZBDRW3UTZDKG",
    "cert_eda.jpg": "https://www.coursera.org/account/accomplishments/verify/7TSQM9K65JBR",
    "cert_powerbi.jpg": "https://www.coursera.org/account/accomplishments/verify/VVVJ99EK3GO9",
    "cert_dataviz.jpg": "https://www.coursera.org/account/accomplishments/verify/CO69P3SYI838",
    "cert_sql.jpg": "https://www.coursera.org/account/accomplishments/verify/T20KEKEHDQTJ"
}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({"width": 1024, "height": 768})
    for name, url in urls.items():
        print(f"Taking screenshot of {url}...")
        try:
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(5000) # wait 5s for everything to render
            
            # The certificate image is usually an img inside the document
            # But just taking full page screenshot is easiest, we can clip
            page.screenshot(path=f"images/{name}", full_page=False)
            print(f"Saved {name}")
        except Exception as e:
            print(f"Failed {name}: {e}")
    browser.close()
