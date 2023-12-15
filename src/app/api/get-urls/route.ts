import axios from "axios";
import { load, CheerioAPI } from 'cheerio';


export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {domain} = body

        const response = await axios.get(domain);
        const $: CheerioAPI = load(response.data);

        const links: string[] = []

         $("a[href]").each((index,element)=>{
            let path = $(element).attr("href") as string;

          if (path && !path.startsWith("#") && !path.startsWith("http")) {
            links.push(new URL(path, domain).toString())
          }
        });

        return new Response(JSON.stringify({ links }), {
            status: 200,
        });

    } catch (error) {
        console.error("🚀 ~ file: route.ts:18 ~ POST ~ error:", error);
        return new Response(`Something went wrong`, { status: 409 });
    }
}




