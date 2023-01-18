const puppeteer = require('puppeteer');

// extraer de https://pe.indeed.com
// extraer de https://www.locanto.com.pe
// extraer de https://www.buscojobs.pe
// extraer de https://www.bumeran.com.pe
// extraer de https://www.computrabajo.com.pe
// extraer de https://www.kitempleo.com.pe
var buscar = "laravel";

// locanto
async function locanto(buscar) {
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
    // buscar la palabra laravel 
    await page.type('.js-topnav-search', buscar);
    // hacer click en el boton buscar
    await page.click('.search_form__find_btn');
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // extraer el texto de .textHeader
    const text = await page.evaluate(() => {
        const elements = document.querySelectorAll('.textHeader a');
        // almacenar en ofertas[] el titulo y el enlace
        var ofertas = [];
        var siguiente = [];
        for (let element of elements) {
            // almacenar en ofertas[] el titulo, el enlace y la descripcion
            ofertas.push({ titulo: element.innerText, enlace: element.href, empresa: "", salario: "", descripcion: "", publicado: "", requisitos: "En la descripción.", portal: "Locanto" });
        }
        const elements2 = document.querySelectorAll('.paging a');
        for (let element of elements2) {
            if (element.innerText == "Siguiente ›") {
                siguiente.push(element.href);
            }
        }
        return { ofertas, siguiente };
    });
    // entrar a cada enlace
    for (let i = 0; i < text.ofertas.length; i++) {
        // navegar a la pagina
        await page.goto(text.ofertas[i].enlace);
        // esperar 5 segundos
        await page.waitForTimeout(5000);
        // extraer el texto de .textHeader y almacenar en text.ofertas[i]
        text.ofertas[i].descripcion = await page.evaluate(() => {
            const element = document.querySelector('#js-user_content');
            return element.innerText.replace("\n", "");
        });
        text.ofertas[i].publicado = await page.evaluate(() => {
            // extraer el texto de .posting_info y quitar la palabra Publicado
            const element = document.querySelector('.posting_info');
            // quitarle el "Publicado\n"
            return element.innerText.replace("Publicado\n", "");
        })
    }
    // cerrar el navegador
    await browser.close();
    console.log("Locanto: " + text.ofertas.length + " ofertas laborales encontradas");
    return text;
}
// indeed
async function indeed(buscar) {
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
        domain: 'www.indeed.com',
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
    await page.goto('https://www.indeed.com/');
    // taking a screenshot
    await page.screenshot({ path: 'indeed_screenshot_1_Step.png' });
    // buscar la palabra laravel 
    await page.type('#text-input-what', buscar);
    // hacer click en el boton buscar
    await page.click('.yosegi-InlineWhatWhere-primaryButton');
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // tomar una captura de pantalla
    await page.screenshot({ path: 'indeed_screenshot_2_Step.png' });
    // extraer el texto de .textHeader
    const text = await page.evaluate(() => {
        const elements = document.querySelectorAll('.jobTitle a');
        // almacenar en ofertas[] el titulo y el enlace
        var ofertas = [];
        var siguiente = [];
        for (let element of elements) {
            ofertas.push({ titulo: element.innerText, enlace: element.href, empresa: "", salario: "", descripcion: "", publicado: "", requisitos: "En la descripción.", portal: "Indeed" });
        }
        const elements2 = document.querySelectorAll('nav a');
        for (let element of elements2) {
            if (element.getAttribute('aria-label') == "Next Page") {
                siguiente.push(element.href);
            }
        }
        return { ofertas, siguiente };
    });
    for (let i = 0; i < text.ofertas.length; i++) {
        // navegar a la pagina
        await page.goto(text.ofertas[i].enlace);
        // esperar 5 segundos
        await page.waitForTimeout(5000);
        // extraer el texto de span class="css-2iqe2o eu4oa1w0" y almacenar en text.ofertas[i]
        text.ofertas[i].salario = await page.evaluate(() => {
            const element = document.querySelector('span.css-2iqe2o');
            // si existe el elemento
            if (element) {
                return element.innerText;
            } else {
                return "";
            }
        });
        text.ofertas[i].empresa = await page.evaluate(() => {
            const element = document.querySelector('div.jobsearch-InlineCompanyRating');
            // si existe el elemento
            if (element) {
                return element.innerText;
            } else {
                return "";
            }
        });
        text.ofertas[i].descripcion = await page.evaluate(() => {
            const element = document.querySelector('#jobDescriptionText');
            return element.innerText;
        });
        text.ofertas[i].publicado = await page.evaluate(() => {
            // extraer el texto de span class="css-kyg8or eu4oa1w0" y quitar la palabra Publicado
            const element = document.querySelector('span.css-kyg8or.eu4oa1w0');
            // quitarle el "Publicado\n"
            return element.innerText.replace("Publicado ", "");
        })
    }
    // cerrar el navegador
    await browser.close();
    console.log("Indeed: " + text.ofertas.length + " ofertas laborales encontradas");
    return text;
}
// buscojobs
async function buscojobs(buscar) {
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
        domain: 'www.buscojobs.pe',
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
    await page.goto('https://www.buscojobs.pe/');
    // buscar la palabra laravel
    await page.type('#que', buscar);
    // hacer click en el boton buscar
    await page.click('#btn-busqueda');
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // extraer el texto de .textHeader
    const text = await page.evaluate(() => {
        const elements = document.querySelectorAll('.ListadoOfertas_oferta__6GIri');
        // almacenar en ofertas[] el titulo y el enlace
        var ofertas = [];
        var siguiente = [];
        for (let element of elements) {
            // del element ir al hijo h3 a
            const titulo = element.querySelector('h3 a');
            // // del element ir al span
            const empresa = element.querySelector('span a');
            // // del element ir a div.ListadoOfertas_ofertaFecha__iMfFb span
            const publicado = element.querySelector('div.ListadoOfertas_ofertaFecha__iMfFb span');
            ofertas.push({ titulo: titulo.innerText, enlace: titulo.href, empresa: empresa.innerText, salario: "", descripcion: "", publicado: publicado.innerText.replace('Publicado ', ''), requisitos: "", portal: "Buscojobs" });
        }
        const elements2 = document.querySelector('#paginaSiguiente a');
        siguiente.push(elements2.href);
        return { ofertas, siguiente };
    });
    for (let i = 0; i < text.ofertas.length; i++) {
        // navegar a la pagina
        await page.goto(text.ofertas[i].enlace);
        // esperar 5 segundos
        await page.waitForTimeout(5000);
        text.ofertas[i].descripcion = await page.evaluate(() => {
            const element = document.querySelector('.OfertaDetalle_descripcion_texto__DCV1g');
            return element.innerText;
        });
        text.ofertas[i].requisitos = await page.evaluate(() => {
            // el segundo .oferta-contenido
            const element = document.querySelectorAll('.oferta-contenido')[1];
            // si existe
            if (element) {
                // el div de dentro 
                const conocimientos = element.querySelector('div div div div:nth-child(2) ul');
                const idiomas = element.querySelector('div div div:nth-child(4) ul');
                return {
                    conocimientos: conocimientos.innerText,
                    idiomas: idiomas.innerText,
                }
            } else {
                return "";
            }
        })
    }
    // cerrar el navegador
    await browser.close();
    console.log("Buscojobs: " + text.ofertas.length + " ofertas laborales encontradas");
    return text;
}
// bumeran
async function bumeran(buscar) {
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
        domain: 'www.bumeran.com.pe',
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
    await page.goto('https://www.bumeran.com.pe/');
    // buscar la palabra laravel
    await page.type('.basic-single input', buscar);
    // hacer click en el boton buscar
    await page.click('#buscarTrabajo');
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // extraer el texto de .textHeader
    const text = await page.evaluate(() => {
        const elements = document.querySelectorAll('.sc-gyFTku a');
        // almacenar en ofertas[] el titulo y el enlace
        var ofertas = [];
        var siguiente = [];
        for (let element of elements) {
            const empresa = element.querySelector("h3.sc-jklikK");
            const publicado = element.querySelector("h3.sc-bCQtTp");
            const titulo = element.querySelector('h2');
            ofertas.push({ titulo: titulo.innerText, enlace: element.href, empresa: empresa.innerText, salario: "", descripcion: "", publicado: publicado.innerText.replace('Publicado ', ''), requisitos: "", portal: "Bumeran" });
        }
        const elements2 = document.querySelector('.sc-gwZsXD');
        // si href el caracter final es # no poner nada
        if (elements2.href.charAt(elements2.href.length - 1) == '#') {
            siguiente.push('');
        } else {
            siguiente.push(elements2.href);
        }
        return { ofertas, siguiente };
    });
    for (let i = 0; i < text.ofertas.length; i++) {
        // navegar a la pagina
        await page.goto(text.ofertas[i].enlace);
        // esperar 5 segundos
        await page.waitForTimeout(5000);
        text.ofertas[i].descripcion = await page.evaluate(() => {
            const element = document.querySelector('.sc-kwXFOU');
            return element.innerText;
        });
    }
    // cerrar el navegador
    await browser.close();
    console.log("Bumeran: " + text.ofertas.length + " ofertas laborales encontradas");
    return text;
}
// computrabajo
async function computrabajo(buscar) {
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
        domain: 'www.computrabajo.com.pe',
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
    await page.goto('https://www.computrabajo.com.pe/');
    // buscar la palabra laravel
    await page.type('#prof-cat-search-input', buscar);
    // hacer click en el boton buscar
    await page.click('#search-button');
    // esperar 5 segundos
    await page.waitForTimeout(5000);
    // extraer el texto de .textHeader
    const text = await page.evaluate(() => {
        const elements = document.querySelectorAll('article.box_offer');
        // almacenar en ofertas[] el titulo y el enlace
        var ofertas = [];
        var siguiente = [];
        for (let element of elements) {
            const titulo = element.querySelector('h1 a.js-o-link');
            const publicado = element.querySelector('p.fs13');
            const empresa = element.querySelector('p.fs16 a');
            // si existe
            if (empresa) {
                ofertas.push({ titulo: titulo.innerText, enlace: titulo.href, empresa: empresa.innerText, salario: "", descripcion: "", publicado: publicado.innerText, requisitos: "", portal: "Computrabajo" });
            } else {
                ofertas.push({ titulo: titulo.innerText, enlace: titulo.href, empresa: "", salario: "", descripcion: "", publicado: publicado.innerText, requisitos: "", portal: "Computrabajo" });
            }
        }
        const elements2 = document.querySelector('.dFlex.vm_fx.tj_fx.mtB span:nth-child(2)');
        siguiente.push(elements2.getAttribute('data-path'));
        return { ofertas, siguiente };
    });
    for (let i = 0; i < text.ofertas.length; i++) {
        // navegar a la pagina
        await page.goto(text.ofertas[i].enlace);
        // esperar 5 segundos
        await page.waitForTimeout(5000);
        text.ofertas[i].salario = await page.evaluate(() => {
            const element = document.querySelector('.box_border div.mt15.mb15');
            // si existe
            if (element) {
                return element.innerText;
            } else {
                return "";
            }
        });
        text.ofertas[i].descripcion = await page.evaluate(() => {
            const element = document.querySelector('p.mbB');
            // si existe
            if (element) {
                return element.innerText;
            } else {
                return "";
            }
        });
        text.ofertas[i].requisitos = await page.evaluate(() => {
            const educacion = document.querySelectorAll('ul.disc li');
            // buscar donde dice conocimientos
            var conocimientos = [];
            var educacion_minima = [];
            var experiencia = [];
            for (let element of educacion) {
                if (element.innerText.includes("Conocimientos")) {
                    conocimientos.push(element.innerText.replace("Conocimientos: ", ""));
                }
                if (element.innerText.includes("Educación mínima")) {
                    educacion_minima.push(element.innerText.replace("Educación mínima: ", ""));
                }
                if (element.innerText.includes("experiencia")) {
                    experiencia.push(element.innerText);
                }
            }
            return { conocimientos, educacion_minima, experiencia };
        });
    }
    // cerrar el navegador
    await browser.close();
    console.log("Computrabajo: " + text.ofertas.length + " ofertas laborales encontradas");
    return text;
}

// main
var ofertas_laborales = [];
var siguiente = [];
async function main() {
    // locanto
    var text = await locanto(buscar);
    for (let oferta of text.ofertas) {
        ofertas_laborales.push(oferta);
    }
    siguiente.push(text.siguiente);
    // indeed
    var text = await indeed(buscar);
    for (let oferta of text.ofertas) {
        ofertas_laborales.push(oferta);
    }
    siguiente.push(text.siguiente);
    // buscojobs
    var text = await buscojobs(buscar);
    for (let oferta of text.ofertas) {
        ofertas_laborales.push(oferta);
    }
    siguiente.push(text.siguiente);
    // bumeran
    var text = await bumeran(buscar);
    for (let oferta of text.ofertas) {
        ofertas_laborales.push(oferta);
    }
    siguiente.push(text.siguiente);
    // computrabajo
    var text = await computrabajo(buscar);
    for (let oferta of text.ofertas) {
        ofertas_laborales.push(oferta);
    }
    siguiente.push(text.siguiente);


    console.log(ofertas_laborales);
    console.log(siguiente);
}
