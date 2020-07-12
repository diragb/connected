# NOTE: Make sure that you've initialized python + venv YOURSELF. I recommend using PyCharm because it'll configure everything automatically.

# IMPORTS:
import json
import pprint
import time

# NOTE: Initialize a virtual environment and install these dependencies via pip.
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# INITIALIZATIONS:
pp = pprint.PrettyPrinter(indent=4)
chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "localhost:6969")
driver = webdriver.Chrome(options=chrome_options)
max_hit_tries = 2000

# NOTE: Run this in cmd (as admin) to launch chrome.
# chrome.exe -remote-debugging-port=6969 --user-data-dir="C:\Selenium\Chrome_Test_Profile"

# FUNCTIONS:


def fbmap(fbusername):
    if "profile" in fbusername:
        driver.get(f"https://www.facebook.com/{fbusername}&sk=friends")
    else:
        driver.get(f"https://www.facebook.com/{fbusername}/friends")

    # Check if we're on the right page.
    try:
        assert "Facebook" in driver.title
    except AssertionError:
        # Wait for some time, then check again.
        time.sleep(5)
        assert "Facebook" in driver.title

    # Wait for ReactJs to load. Yes, I know this code does nothing, but please FUCK OFF.
    react_root_element = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.XPATH, '//*[@id="facebook"]')))

    # Scrap number of friends.
    number_of_friends = int(WebDriverWait(driver, 0.5).until(EC.presence_of_element_located(
        (By.XPATH, '/html/body/div[1]/div/div/div[1]/div[3]/div/div/div[1]/div/div/div/div[3]/div/div/div/div[1]/div/div/div[1]/div/div/div/div[1]/a[3]/div/span/span/div/div/span'))).text)
    print(number_of_friends)
    scanned_friends = 0
    scanned_friends_list = []

    while True:
        # Scrap friends until horizon status is met.
        try:
            profile_link = WebDriverWait(driver, 10).until(EC.presence_of_element_located(
                (By.XPATH, f'/html/body/div[1]/div/div/div[1]/div[3]/div/div/div[1]/div/div/div/div[4]/div/div/div/div/div/div[3]/div[1]/div[1]/a'))).get_attribute('href')

            # NOTE: if you want to scrape profile pictures as well, activate this part of this script.
            if False:
                profile_dp = WebDriverWait(driver, 5).until(EC.presence_of_element_located(
                    (By.XPATH, f'/html/body/div[1]/div/div/div[1]/div[3]/div/div/div[1]/div/div/div/div[4]/div/div/div/div/div/div[3]/div[{(scanned_friends + 1)}]/div[1]/a/img'))).get_attribute('src')

            scanned_friends_list.append(profile_link.split("/")[3])
            scanned_friends = scanned_friends + 1
            update_progress_status(
                profile_link, f' | ✔ {profile_link.split("/")[3]}\'s URL scraped')
            driver.execute_script(
                f'element = document.evaluate("/html/body/div[1]/div/div/div[1]/div[3]/div/div/div[1]/div/div/div/div[4]/div/div/div/div/div/div[3]/div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;'
                f'element.remove();')
        except TimeoutException:
            # Real sexy pythonic one-liner. Meye potey jabey.
            scanned_friends_list = scanned_friends_list[:-2 or None]
            break
    return scanned_friends_list

# Progress status updater + runtime backup.


def update_progress_status(profile_link, new_progress_status, eof=False):
    print_ending = '\n'
    print(new_progress_status, end=print_ending)
    f = open('runtime_backup.txt', 'a', encoding='UTF-8')
    f.write("\t\t" + "\"" + profile_link.split("/")[3] + "\"" + ",\n")
    f.close()


# NOTE: populate this array with the usernames you want to scrape.
fbusernamelist = ["diragbx"]

for username in fbusernamelist:
    list_of_friends = fbmap(username)
    user = {
        "friends": list_of_friends
    }
    user_details_to_append_in_json = json.dumps(obj=user, indent=4)
    f = open('details.json', 'a', encoding='UTF-8')
    f.write(f"\"{username}\": " + user_details_to_append_in_json + ",\n")
    f.close()
