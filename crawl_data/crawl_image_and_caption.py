import csv
import logging
import os
import time

import requests
from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Path to ChromeDriver executable
# Change the path to your chrome driver executable
chrome_driver_path = r'C:\Program Files\Google\Chrome\Application\chromedriver.exe'

# Configure Chrome options
options = webdriver.ChromeOptions()

# Initialize WebDriver
service = Service(executable_path=chrome_driver_path)
driver = webdriver.Chrome(service=service, options=options)
driver.implicitly_wait(5)  # Set implicit wait time


def download_image(img_url, filename, save_folder, retries=3):
    try:
        response = requests.get(img_url, stream=True, timeout=(5, 10))
        response.raise_for_status()  # Checks for HTTP request errors

        file_path = os.path.join(save_folder, filename)

        if not os.path.exists(file_path):  # Check for duplicates
            with open(file_path, 'wb') as out_file:
                for chunk in response.iter_content(8192):
                    out_file.write(chunk)
            logging.info(f"Saved {img_url} as {file_path}")
        else:
            logging.info(f"File {file_path} already exists. Skipping download.")
    except requests.RequestException as e:
        if retries > 0:
            logging.warning(f"Failed to download {img_url}, retrying... ({retries} retries left)")
            download_image(img_url, filename, save_folder, retries - 1)
        else:
            logging.error(f"Failed to download {img_url} after multiple attempts: {e}")


# Function to scroll page
def scroll_to_bottom():
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)


# Folder and file to save images and file csv contain image names and caption
save_folder = 'D:\\Saved_Images_diving'  # Can replace
csv_file_path = 'D:\\image_data_diving.csv'  # Can replace

if not os.path.exists(save_folder):
    os.makedirs(save_folder)

try:
    # Access the webpage containing images (Can replace another) 
    driver.get("https://www.pexels.com/search/Diving/")
    logging.info("Navigated to the webpage.")

    # Scroll the page multiple times to load more content
    for _ in range(10):
        scroll_to_bottom()
        logging.info("Scrolled to bottom of the page.")

    # Initialize CSV file
    with open(csv_file_path, mode='w', newline='', encoding='utf-8') as csv_file:
        fieldnames = ['Image Filename', 'Caption']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
        writer.writeheader()

        # Initialize image counter
        image_counter = 1

        # Retry logic for finding and processing images
        max_attempts = 5
        for attempt in range(max_attempts):
            try:
                WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.TAG_NAME, 'img'))
                )
                images = driver.find_elements(By.TAG_NAME, 'img')
                logging.info(f"Found {len(images)} images on attempt {attempt + 1}.")

                for image in images:
                    img_url = image.get_attribute('src')
                    alt_text = image.get_attribute('alt') or 'no_alt_text'
                    if img_url and img_url.startswith('http'):
                        filename = f"image{image_counter:03d}.jpg"
                        writer.writerow({'Image Filename': filename, 'Caption': alt_text})
                        download_image(img_url, filename, save_folder)
                        image_counter += 1
                break  # Break out of the loop if successful
            except (StaleElementReferenceException, TimeoutException) as e:
                logging.warning(f"Attempt {attempt + 1}/{max_attempts} - encountered issue: {e}")
                time.sleep(2)  # Wait before trying again

except Exception as e:
    logging.error(f"An error occurred: {e}")
finally:
    # Close the browser
    driver.quit()
    logging.info("Browser closed.")
