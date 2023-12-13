"use client";

import { FC, useState } from "react";

import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface URLInputProps {
  domain: string;
  setDomain: (newValue: string) => void;
  setUrls: (newValue: []) => void;
}

const URLInput: FC<URLInputProps> = ({ domain, setDomain, setUrls }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  async function fetchUrls() {
    setDisabled(true);
    try {
      let res = await axios.post("/api/get-urls", {
        url: domain,
      });
      setUrls(res.data.domainInfo);
      toast.success("Successfully fetched urls.")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setDisabled(false);
    }
  }

  return (
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
  );
};

export default URLInput;
