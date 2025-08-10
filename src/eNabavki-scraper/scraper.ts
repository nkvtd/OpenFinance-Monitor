import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export async function scrape(typeContract: string): Promise<any[]> {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-features=HttpsFirstBalancedModeAutoEnable',
        ]
    });

    const page = await browser.newPage();

    await page.goto(`https://e-nabavki.gov.mk/PublicAccess/home.aspx#/`+typeContract, {
        waitUntil: 'networkidle2',
        timeout: 60000
    });

    await page.waitForFunction(() => {
        const table = document.querySelector('.table-responsive table');
        if (!table) {
            return false;
        }

        const rows = table.querySelectorAll('tbody tr');

        // @ts-ignore
        return rows.length > 0 && rows[0].querySelectorAll('td').length > 0;
    }, {
        timeout: 120000,
        polling: 1000
    })

    let data = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr[role="row"]');

        let scrapedData: any[] = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');

            if (cells.length > 0) {
                scrapedData.push(Array.from(cells).map(cell => cell.textContent ? cell.textContent.trim() : ''));
            }
        });

        return scrapedData;
    })

    await browser.close();

    return data;
}