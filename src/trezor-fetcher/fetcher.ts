import axios from 'axios';
import * as tough from 'tough-cookie';

export async function fetchTransactions(): Promise<any> {
    const cookieJar = new tough.CookieJar();
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(async (config) => {
        const cookies = await cookieJar.getCookies(config.url!);
        config.headers.Cookie = cookies.map(cookie => cookie.cookieString()).join('; ');
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        const setCookieHeaders = response.headers['set-cookie'];
        if (setCookieHeaders) {
            setCookieHeaders.forEach((cookieStr: string) => {
                cookieJar.setCookie(cookieStr, response.config.url!, (err) => {
                    if (err) console.error('Error setting cookie:', err);
                });
            });
        }
        return response;
    });

    await axiosInstance.get('https://open.finance.gov.mk/mk/search', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.5',
        }
    });

    const now = new Date();
    const startYear = now.getFullYear() - 1;
    const startMonth = 0;
    const endYear = now.getFullYear();
    const endMonth = now.getMonth() + 1;

    const params = {
        term: '',
        month_from: startMonth,
        year_from: startYear,
        month_to: endMonth,
        year_to: endYear,
        action: 'global',
        payer: '',
        recipient: '',
        payerEDB: '',
        recipientEDB: '',
        draw: 1,
        start: 0,
        length: 50,
        search: { value: '', regex: false },
        _: Date.now(),
        columns: [
            {
                data: 'data_valuta',
                name: 'data_valuta',
            },
            {
                data: 'naziv_primac',
                name: 'naziv_primac',
            },
            {
                data: 'naziv_davac',
                name: 'naziv_davac',
            },
            {
                data: 'smetka_davac',
                name: 'smetka_davac',
            },
            {
                data: 'ec_code_davac',
                name: 'ec_code_davac',
            },
            {
                data: 'bu_program_davac',
                name: 'bu_program_davac',
            },
            {
                data: 'iznos',
                name: 'iznos',
            }
        ].map((col) => ({
            ...col,
            searchable: true,
            orderable: false,
            search: { value: '', regex: false }
        }))
    };

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://open.finance.gov.mk/mk/search',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Priority': 'u=0',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    };

    try {
        let data = await axiosInstance.get('https://open.finance.gov.mk/api/datatable/search/transactions', {
            params,
            headers
        });

        return data.data.data;
    } catch (error) {
        throw error;
    }
}