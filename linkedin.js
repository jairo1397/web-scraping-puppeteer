// extraer de https://www.linkedin.com/jobs/
const puppeteer = require('puppeteer');

(async () => {
    // abrimos un navegador
    const browser = await puppeteer.launch();
    // abrimos una pagina
    const page = await browser.newPage();

    // setting the viewport
    await page.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    // setting the cookies
    await page.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'www.linkedin.com',
        path: '/',
        expires: 2147483647,
        httpOnly: false,
        secure: false,
        sameSite: 'None'
    });
    // setting the cache
    await page.setCacheEnabled(false);
    // setting the javascript
    await page.setJavaScriptEnabled(true);
    // setting the offline mode
    await page.setOfflineMode(false);

    // navigating to the site
    await page.goto('https://www.linkedin.com/jobs/search?keywords=&location=Área%20metropolitana%20de%20Lima&geoId=90010207&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0');

    // buscar la palabra laravel en el segundo class="dismissable-input__input"
    await page.type('.dismissable-input__input', 'laravel');
    // darle al boton enter
    await page.keyboard.press('Enter');
    // cuando termine de cargar la pagina
    // await page.waitForNavigation();
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // taking a screenshot
    await page.screenshot({ path: 'screenshot.png' });
    // closing the browser
    await browser.close();
})();