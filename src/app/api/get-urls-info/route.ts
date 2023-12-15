import axios from "axios";
import { load } from 'cheerio';


async function getDomainInfo(URLs: string[]): Promise<URLInfo[]> {
    try {
        const promises = URLs.map(async (URL) => {
            const response = await axios.get(URL);
            const $ = load(response.data);
            const text = $('body').text();
            const characters = text.length;

            return { text, characters, url: URL } as URLInfo;
        });

        return await Promise.all(promises);
    } catch (error) {
        throw error;
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { urls:links } = body;

        let domainInfo:URLInfo[] = [];

        if(Array.isArray(links)){
            domainInfo = await getDomainInfo(links);
        }

        return new Response(JSON.stringify({ domainInfo }));
    } catch (error) {
        console.error("🚀 ~ file: route.ts:18 ~ POST ~ error:", error);
        return new Response(`Something went wrong`, { status: 409 });
    }
}




