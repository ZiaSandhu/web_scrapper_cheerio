"use client";

import { FC, useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

import ProgressBar from "@ramonak/react-progress-bar";

interface URLInputProps {
  domain: string;
  setDomain: (newValue: string) => void;
  setUrls: (newValue: string[]) => void;
  setDomainInfo: (newValue: URLInfo[]) => void;
}

const URLInput: FC<URLInputProps> = ({
  domain,
  setDomain,
  setUrls,
  setDomainInfo,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [total,setTotal] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  async function fetchUrls() {
    setDomainInfo([])
    setDisabled(true);
    setTotal(0)
    setUrls([])
    try {
      let res = await axios.post(
        "/api/get-urls",
        {
          domain,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Add other headers if needed
          },
        }
      );
      let links = res.data.links;
      let uniqueLinksSet: Set<string> = new Set(links);
      let uniqueLinksArray: string[] = Array.from(uniqueLinksSet);
      
      
      setUrls(uniqueLinksArray);

      let data: URLInfo[] = [];

      let totalLinks = uniqueLinksArray.length;

      setTotal(totalLinks)

      for (let index = 0; index < totalLinks; index += 5) {
        const batch = uniqueLinksArray.slice(index, index + 5);

        let info = await axios.post(
          "/api/get-urls-info",
          { urls: batch },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let result = info.data.domainInfo as URLInfo[];
        data.push(...result);

        setDomainInfo([...data]);

        setProgress(index+5);
      }
      toast.success("Successfully fetched URLs.");
      setProgress(0);
      
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDisabled(false);
    }
  }

  return (
    <>
      <div className="flex w-full max-w-5xl items-center mt-10 space-x-2">
        <Input
          type="text"
          placeholder="www.domain.xyz"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              fetchUrls();
            }
          }}
        />
        <Button onClick={fetchUrls} disabled={disabled}>
          Fetch
        </Button>
      </div>
      <div className=" w-full max-w-5xl flex items-center ">
        {progress > 0 && (
          <ProgressBar completed={progress} customLabel={`${progress}/${total}`} maxCompleted={total} bgColor="black" className="w-full" />
        )}
      </div>
    </>
  );
};

export default URLInput;
