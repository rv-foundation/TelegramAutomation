const { Builder, By, Key , until } = require('selenium-webdriver');
const config = require('../config')


async function login(stock) {
   console.log(stock)
    var driver = new Builder().forBrowser('chrome').build();
    //var watchList =  require('searchWatchList')
    /**
     * By.name = name attribute inside HTML tag
     * Example: <input name=login></input>
     */
    const typeLogin = driver.findElement(By.id('userid')).sendKeys(config.zerodha.id, Key.TAB);
    const typePassword = driver.findElement(By.id('password')).sendKeys(config.zerodha.pass, Key.RETURN);
    const loginButton = driver.findElement(By.css("button[type=submit]"))

    await driver.get('https://kite.zerodha.com/');
    Promise.all([typeLogin, typePassword]).catch(reason => {
        console.log(reason);
    }).then(() => {
       loginButton.click().then(() => {
         console.log("log")
         driver.wait(until.elementLocated(By.id("pin")), 3000);
         driver.findElement(By.id("pin")).sendKeys(config.zerodha.pin)
         driver.findElement(By.css("button[type=submit]")).click();
         driver.wait(until.elementLocated(By.css("input[type=text]")), 30000);
         driver.findElement(By.css("input[type=text]")).sendKeys(stock,Key.ENTER)
       });
    })
}

module.exports = { login }
