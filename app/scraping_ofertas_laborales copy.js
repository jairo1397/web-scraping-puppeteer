const puppeteer = require('puppeteer');

// extraer de https://pe.indeed.com
// extraer de https://www.locanto.com.pe
// extraer de https://www.buscojobs.pe
// extraer de https://www.bumeran.com.pe
// extraer de https://www.computrabajo.com.pe
// extraer de https://www.kitempleo.com.pe
var buscar = "laravel";

(async () => {
    // abrimos un navegador
    const browser = await puppeteer.launch();
    // abrimos una pagina
    const page = await browser.newPage();
    // checking if the site conection is secure
    page.on('requestfailed', request => {
        if (request.resourceType() === 'image') {
            console.log(request.failure().errorText);
        }
    });
    // setting the viewport
    await page.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });

    // locanto-start
    // setting the cookies
    await page.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'www.locanto.com.pe',
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
    await page.goto('https://www.locanto.com.pe/');
    // taking a screenshot
    await page.screenshot({ path: 'locanto_screenshot_1_Step.png' });

    // buscar la palabra laravel en name="query"
    await page.type('.js-topnav-search', buscar);
    // hacer click en el boton buscar
    await page.click('.search_form__find_btn');
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // tomar una captura de pantalla
    await page.screenshot({ path: 'locanto_screenshot_2_Step.png' });
    // extraer el texto de .textHeader
    const text = await page.evaluate(() => {
        const elements = document.querySelectorAll('.textHeader a');
        const texts = [];
        const href = [];
        const siguiente = [];
        for (let element of elements) {
            texts.push(element.innerText);
            href.push(element.href);
        }
        // buscar el a con el texto siguiente
        const elements2 = document.querySelectorAll('.paging a');
        for (let element of elements2) {
            if (element.innerText == "Siguiente ›") {
                siguiente.push(element.href);
            }
        }
        return { texts, href, siguiente };
    });
    console.log(text);
    await browser.close();
    // locanto-end


    // indeed-start
    // iniciamos el navegador
    const browser2 = await puppeteer.launch();
    // abrimos una pagina
    const page2 = await browser2.newPage();
    // setting the viewport
    await page2.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page2.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page2.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    // setting the cookies
    await page2.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'pe.indeed.com',
        path: '/',
        expires: 2147483647,
        httpOnly: false,
        secure: false,
        sameSite: 'None'
    });
    // setting the cache
    await page2.setCacheEnabled(false);
    // setting the javascript
    await page2.setJavaScriptEnabled(true);
    // setting the offline mode
    await page2.setOfflineMode(false);

    // navigating to the site
    await page2.goto('https://pe.indeed.com/');
    // taking a screenshot
    await page2.screenshot({ path: 'indeed_screenshot_1_Step.png' });

    // buscar la palabra laravel en name="q"
    await page2.type('#text-input-what', buscar);
    // hacer click en el boton buscar
    await page2.click('.yosegi-InlineWhatWhere-primaryButton');
    // esperar 5 segundos
    await page2.waitForTimeout(5000);
    // tomar una captura de pantalla
    await page2.screenshot({ path: 'indeed_screenshot_2_Step.png' });
    // extraer el texto de .jobtitle
    const text2 = await page2.evaluate(() => {
        const elements = document.querySelectorAll('.jobTitle a');
        const texts = [];
        const href = [];
        const siguiente = [];
        for (let element of elements) {
            texts.push(element.innerText);
            href.push(element.href);
        }
        // buscar el a con el aria-label="Next Page"
        const elements2 = document.querySelectorAll('nav a');
        for (let element of elements2) {
            if (element.getAttribute('aria-label') == "Next Page") {
                siguiente.push(element.href);
            }
        }

        return { texts, href, siguiente };
    }
    );
    console.log(text2);
    await browser2.close();

    // buscojobs-start
    // iniciamos el navegador
    const browser3 = await puppeteer.launch();
    // abrimos una pagina
    const page3 = await browser3.newPage();
    // setting the viewport
    await page3.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page3.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page3.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    // setting the cookies
    await page3.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'www.buscojobs.pe',
        path: '/',
        expires: 2147483647,
        httpOnly: false,
        secure: false,
        sameSite: 'None'
    });
    // setting the cache
    await page3.setCacheEnabled(false);
    // setting the javascript
    await page3.setJavaScriptEnabled(true);
    // setting the offline mode
    await page3.setOfflineMode(false);

    // navigating to the site
    await page3.goto('https://www.buscojobs.pe/');
    // taking a screenshot
    await page3.screenshot({ path: 'buscojobs_screenshot_1_Step.png' });

    // buscar la palabra laravel en name="q"
    await page3.type('#que', buscar);
    // hacer click en el boton buscar
    await page3.click('#btn-busqueda');
    // esperar 5 segundos
    await page3.waitForTimeout(5000);
    // tomar una captura de pantalla
    await page3.screenshot({ path: 'buscojobs_screenshot_2_Step.png' });
    // extraer el texto de .jobtitle
    const text3 = await page3.evaluate(() => {
        const elements = document.querySelectorAll('.ListadoOfertas_above__TFBOi');
        const texts = [];
        const href = [];
        const siguiente = [];
        for (let element of elements) {
            texts.push(element.innerText);
            href.push(element.href);
        }
        //obtener solo un elemento el href del unico #paginaSiguiente
        const elements2 = document.querySelector('#paginaSiguiente a');
        siguiente.push(elements2.href);

        return { texts, href, siguiente };
    }
    );
    console.log(text3);
    await browser3.close();
    // buscojobs-end

    // bumeran-start
    // iniciamos el navegador
    const browser4 = await puppeteer.launch();
    // abrimos una pagina
    const page4 = await browser4.newPage();
    // setting the viewport
    await page4.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page4.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page4.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    // setting the cookies
    await page4.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'www.bumeran.com.pe',
        path: '/',
        expires: 2147483647,
        httpOnly: false,
        secure: false,
        sameSite: 'None'
    });
    // setting the cache
    await page4.setCacheEnabled(false);
    // setting the javascript
    await page4.setJavaScriptEnabled(true);
    // setting the offline mode
    await page4.setOfflineMode(false);

    // navigating to the site
    await page4.goto('https://www.bumeran.com.pe/');
    // taking a screenshot
    await page4.screenshot({ path: 'bumeran_screenshot_1_Step.png' });

    // buscar la palabra laravel en name="q"
    await page4.type('.basic-single input', buscar);
    // hacer click en el boton buscar
    await page4.click('#buscarTrabajo');
    // esperar 5 segundos
    await page4.waitForTimeout(5000);
    // tomar una captura de pantalla
    await page4.screenshot({ path: 'bumeran_screenshot_2_Step.png' });
    // extraer el texto de .jobtitle
    const text4 = await page4.evaluate(() => {
        const elements = document.querySelectorAll('.sc-gyFTku a');
        const elements_2 = document.querySelectorAll('.sc-dcmekm');
        const texts = [];
        const href = [];
        const siguiente = [];
        for (let element of elements) {
            href.push(element.href);
            // dentro del element obtener el h2
            const element_2 = element.querySelector('h2');
            texts.push(element_2.innerText);
        }
        // obtener el href de class="sc-gwZsXD EvJhT"
        const elements2 = document.querySelector('.sc-gwZsXD');
        // si href el caracter final es # no poner nada
        if (elements2.href.charAt(elements2.href.length - 1) == '#') {
            siguiente.push('');
        } else {
            siguiente.push(elements2.href);
        }
        return { texts, href, siguiente };
    }
    );
    console.log(text4);
    await browser4.close();
    // bumeran-end

    // computrabajo-start
    // iniciamos el navegador
    const browser5 = await puppeteer.launch();
    // abrimos una pagina
    const page5 = await browser5.newPage();
    // setting the viewport
    await page5.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page5.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page5.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    // setting the cookies
    await page5.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'www.computrabajo.com.pe',
        path: '/',
        expires: 2147483647,
        httpOnly: false,
        secure: false,
        sameSite: 'None'
    });
    // setting the cache
    await page5.setCacheEnabled(false);
    // setting the javascript
    await page5.setJavaScriptEnabled(true);
    // setting the offline mode
    await page5.setOfflineMode(false);

    // navigating to the site
    await page5.goto('https://www.computrabajo.com.pe/');
    // taking a screenshot
    await page5.screenshot({ path: 'computrabajo_screenshot_1_Step.png' });

    // buscar la palabra laravel
    await page5.type('#prof-cat-search-input', buscar);
    // hacer click en el boton buscar
    await page5.click('#search-button');
    // esperar 5 segundos
    await page5.waitForTimeout(5000);

    // tomar una captura de pantalla
    await page5.screenshot({ path: 'computrabajo_screenshot_2_Step.png' });
    // extraer el texto de .jobtitle
    const text5 = await page5.evaluate(() => {
        const elements = document.querySelectorAll('.js-o-link');
        const texts = [];
        const href = [];
        const siguiente = [];
        for (let element of elements) {
            href.push(element.href);
            texts.push(element.innerText);
        }
        // obtener el texto del atributo data-path de class="dFlex vm_fx tj_fx mtB" del segundo span
        const elements2 = document.querySelector('.dFlex.vm_fx.tj_fx.mtB span:nth-child(2)');

        siguiente.push(elements2.getAttribute('data-path'));

        return { texts, href, siguiente };
    }
    );
    console.log(text5);
    await browser5.close();
    // computrabajo-end

    // kitempleo-start
    // iniciamos el navegador
    const browser6 = await puppeteer.launch();
    // abrimos una pagina
    const page6 = await browser6.newPage();
    // setting the viewport
    await page6.setViewport({ width: 1920, height: 1080 });
    // setting the user agent
    await page6.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.119 Safari/537.36');
    // setting the language
    await page6.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
    });
    // setting the cookies
    await page6.setCookie({
        name: 'cookieName',
        value: 'cookieValue',
        domain: 'www.kitempleo.com.pe',
        path: '/',
        expires: 2147483647,
        httpOnly: false,
        secure: false,
        sameSite: 'None'
    });
    // setting the cache
    await page6.setCacheEnabled(false);
    // setting the javascript
    await page6.setJavaScriptEnabled(true);
    // setting the offline mode
    await page6.setOfflineMode(false);

    // navigating to the site
    await page6.goto('https://www.kitempleo.pe');
    // taking a screenshot
    await page6.screenshot({ path: 'kitempleo_screenshot_1_Step.png' });

    // buscar la palabra laravel
    await page6.type('#search_form input', buscar);
    // hacer click en el boton buscar
    await page6.click('#search_form button');
    // esperar 5 segundos
    await page6.waitForTimeout(5000);

    // tomar una captura de pantalla
    await page6.screenshot({ path: 'kitempleo_screenshot_2_Step.png' });
    // extraer el texto de .jobtitle
    const text6 = await page6.evaluate(() => {
        const elements = document.querySelectorAll('.col-xs-12 a div h3 a');
        const texts = [];
        const href = [];
        const siguiente = [];
        for (let element of elements) {
            texts.push(element.innerText);
            // obtener href de .col-xs-12 a
            href.push(element.parentElement.parentElement.href);
        }
        // obtener el texto del atributo href del segundo class="col-md-6 col-xs-12"
        const elements2 = document.querySelectorAll('.col-xs-12 a');
        for (let element of elements2) {
            // si el texto es Siguiente
            if (element.innerText == 'Siguiente') {
                siguiente.push(element.href);
            }
        }
        return { texts, href, siguiente };
    }
    );
    console.log(text6);
    await browser6.close();
    // kitempleo-end

})();

