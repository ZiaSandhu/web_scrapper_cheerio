"use client"
import { FC, useState } from 'react'
import DataTable from '@/components/DataTable'
import URLInput from '@/components/URLInput'
import SaveFile from './SaveFile'
      
import { Toaster } from "react-hot-toast";

interface MainComponentProps {
  
}


const MainComponent: FC<MainComponentProps> = ({}) => {
  
    const [domain, setDomain] = useState<string>('')
    const [urls, setUrls] = useState<URLInfo[]>([])

    

  return (
    <>
      <h1 className="text-center text-3xl">Web Scrapping Using Cheerio</h1>
      <URLInput domain={domain} setDomain={setDomain} setUrls={setUrls} />
      <DataTable data={urls} setData={setUrls}/>
      <SaveFile urls={urls} domain={domain} />
      <Toaster position="top-center" reverseOrder={false} />

    </>
  );
}

export default MainComponent