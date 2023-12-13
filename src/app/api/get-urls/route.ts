import axios from "axios";
import { load, CheerioAPI } from 'cheerio';


async function getDomainInfo(domain: string): Promise<URLInfo[]> {
    try {
        const response = await axios.get(domain);
        const $: CheerioAPI = load(response.data);

        const domainInfo: URLInfo[] = [];

        const promises = $('a[href]').map(async (index, element) => {
            let path = $(element).attr('href') as string;

            if (path && !path.startsWith('#') && !path.startsWith('http')) {
                const absoluteUrl = new URL(path, domain).toString();

                try {
                    const response = await axios.get(absoluteUrl);
                    const $ = load(response.data);
                    const text = $('body').text();
                    const characters = text.length;
                    // const trimmed_text = text.substring(0, 50) + "...";
                    domainInfo.push({ text, characters, url: absoluteUrl });
                } catch (error) {
                    console.error(`Error fetching or processing data for ${absoluteUrl}:`, error);
                    throw error
                }
            }
        }).get() as Promise<void>[]; // Get the promises array

        await Promise.all(promises);

        return domainInfo;
    } catch (error) {
        console.error(`Error fetching data for ${domain}:`, error);
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url: domain } = body;

        const domainInfo = await getDomainInfo(domain);

        return new Response(JSON.stringify({ domainInfo }));
    } catch (error) {
        console.error("🚀 ~ file: route.ts:18 ~ POST ~ error:", error);
        return new Response(`Something went wrong`, { status: 409 });
    }
}
