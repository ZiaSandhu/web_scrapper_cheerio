import { FC } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface TableProps {
  data: URLInfo[]
}

const DataTable: FC<TableProps> = ({data}) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] truncate">Context</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Character</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length > 0 && data.map((url,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{url.text}</TableCell>
            <TableCell>{url.url}</TableCell>
            <TableCell>{url.characters}</TableCell>
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
  )
}

export default DataTable