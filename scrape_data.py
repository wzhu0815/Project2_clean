# import dependencies
from splinter import Browser
from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium import webdriver
import time
from webdriver_manager.chrome import ChromeDriverManager

# using similar code from webscraping challenge hw

# def init_browser():
#     # executable_path = {'executable_path': 'C:/Program Files/chromedriver_win32/chromedriver'}
#     # executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
#     # return Browser("chrome", **executable_path)
#     # executable_path = {"executable_path": ChromeDriverManager().install()}
#     # browser = Browser('chrome', **executable_path, headless=False)
#     executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
#     return Browser("chrome", **executable_path)

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": ChromeDriverManager().install()}
    # executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    return Browser("chrome", **executable_path, headless=False)



# create scrape function
def scrape():
    browser = init_browser()

    # use browser to open the url 
    url = "https://www.travelpulse.com/news/airlines"

    browser.visit(url)

    time.sleep(1)

    # scrape page into soup
    html = browser.html
    soup = bs(html, "html.parser")



    # --- LATEST NEWS---

    data = soup.find(class_="news category sub_category")
    find1 = data.find("div", class_="top_story")
    
    news_title = find1.find("h2").text
    news_p = find1.find("p", class_="content_14 mar_t_5 mar_b_20").text
    news_img = find1.find('img').get("src")
    news_link = find1.find('a').get('href')

    

   # --- IMAGES---
    # visit url to get the full image url
    
    image_url = 'https://unsplash.com/s/photos/airport'
    
    # use browser to open the url for image
    
    browser.visit(image_url) 

    # create html to parse
    
    html = browser.html

    # create soup object to parse html
    
    soup = bs(html, "html.parser")


    find2 = soup.select_one("div", class_="_1t05-")
    img1 = find2.find("img").get("src")


    # # ---FACTS/Examples Delays Chart---
    
    # visit url to get the full image url
    
    delays_url = 'https://www.enotrans.org/eno-resources/know-aircraft-delays/'
    
    # use browser to open the url for image
    
    browser.visit(delays_url) 

    # create html to parse
    
    html = browser.html

    # create soup object to parse html
    
    soup = bs(html, "html.parser")

    delays = soup.find("figure", id="attachment_35836", class_="wp-caption alignnone")
    img2 = delays.find("img").get("src")

    news_url = 'https://www.flightglobal.com/news'
    browser.visit(news_url) 

    # create html to parse
    
    html = browser.html

    # create soup object to parse html
    
    soup = bs(html, "html.parser")

    # delays = soup.find("figure", id="attachment_35836", class_="wp-caption alignnone")
    # img2 = delays.find("img").get("src")
   
    # find2 = soup.find(class_="item_first")
    find2 = soup.find("div", class_="item-first")
    news_title2 = find2.find("h2").text
    news_paragraph2 = find2.find("p", class_="intro").text
    news_img2 = find2.find('img').get("src")
    news_link2 = find2.find('a').get('href')



    # return one Python dictionary containing all of the scraped data
    # create dictionary to hold the obtained airline/airport details
    scraped_details= {
        "news_title": news_title,
        "news_paragraph" : news_p,
        'news_img':news_img,
        'news_link':news_link,
        "image1": img1,
        "image2": img2,
        "news_title2": news_title2,
        "news_paragraph2" : news_paragraph2,
        'news_img2':news_img2,
        'news_link2':news_link2,



    }

    # close the browser after scraping
    browser.quit()

    # return results
    return scraped_details