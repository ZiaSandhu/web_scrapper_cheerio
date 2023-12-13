"use client"
import { FC, useState } from 'react'
import DataTable from '@/components/DataTable'
import URLInput from '@/components/URLInput'
import { Button } from './ui/button'
// import DataTable from '@/components/Table'

interface MainComponentProps {
  
}


const MainComponent: FC<MainComponentProps> = ({}) => {
  
    const [domain, setDomain] = useState<string>('')
    const [urls, setUrls] = useState<URLInfo[]>([])

    function saveFile(){
      
    }

  return (
    <>
      <h1 className="text-center text-3xl">Web Scrapping Using Cheerio</h1>
      <URLInput domain={domain} setDomain={setDomain} setUrls={setUrls} />
      <DataTable data={urls} setData={setUrls}/>
      <div className='flex justify-end w-full max-w-5xl'> <Button > Save Text as File </Button> </div>
    </>
  );
}

export default MainComponent