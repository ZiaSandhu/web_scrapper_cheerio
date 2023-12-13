"use client"

import { FC, useState } from "react";
import { Button } from "./ui/button";

import JSZip from 'jszip'
import ProgressBar from "@ramonak/react-progress-bar";


interface SaveFileProps {
    urls: URLInfo[]
    domain: string
}

const SaveFile: FC<SaveFileProps> = ({urls, domain}) => {

    const [progress, setProgress] = useState<number>(0)


    const saveFile = async () => {

        let currentProgress = 0

        const zip = new JSZip();
    
        const url = new URL("https://dorvn.com");
        const domainParts = url.hostname.split('.');
        const subdomain = domainParts[0];

        const totalSize = urls.reduce((acc, file) => acc + new TextEncoder().encode(file.text).length, 0);

        urls.forEach(async (file) => {
            const blob = new Blob([file.text], { type: 'text/plain' });
            let path = file.url
            let name = path.split('/').join('-')
            zip.file(`${name}.txt`, blob);
      
            currentProgress += new TextEncoder().encode(file.text).length;
      
            setProgress((currentProgress / totalSize) * 100);
          });
    
          const content = await zip.generateAsync(
            {
              type: 'blob',
            },
            (metadata) => {
              if (metadata.percent) {
                // Update the progress state
                setProgress(metadata.percent);
              }
            }
          );
    
        const link = document.createElement('a');
    
        link.download = `${subdomain}.zip`;
    
        link.href = window.URL.createObjectURL(content);
    
        document.body.appendChild(link);
    
        link.click();

        document.body.removeChild(link);

        setProgress(0)
      };

  return (
    <div className="flex justify-between items-center w-full max-w-5xl">
      <div className="w-full">
      {progress > 0 && (
        <ProgressBar completed={progress} className="max-w-md w-full" />
      )}
      </div>
      <Button disabled={urls.length === 0} onClick={saveFile}> Save Text as File </Button>{" "}
    </div>
  );
};

export default SaveFile;
