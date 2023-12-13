"use client"
import { FC, useState } from 'react'
import DataTable from '@/components/DataTable'
import URLInput from '@/components/URLInput'
import SaveFile from './SaveFile'

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
    </>
  );
}

export default MainComponent