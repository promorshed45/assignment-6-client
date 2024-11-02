/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
} from "@nextui-org/react";
import { Check, X } from "lucide-react";

export default function PaymenttManagement({payments}: any) {

  return (
    <Table aria-label="static collection table">
      <TableHeader>
        <TableColumn>IMAGE</TableColumn>
        <TableColumn>User</TableColumn>
        <TableColumn>Verified</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Payment Status</TableColumn>
      </TableHeader>
      <TableBody>
        {payments?.map((payemnt: any) => {
          return (
            <TableRow key={payemnt?._id}>
              <TableCell>
                <Image alt={payemnt.title} className="size-10" src={payemnt?.user?.profilePhoto} />
              </TableCell>
              <TableCell>{payemnt?.user?.name}</TableCell>
              <TableCell>
                <span
                  className={`${payemnt?.user?.verified == true ? "text-green-500" : "text-blue-500"}`}
                >
                  {payemnt?.user?.verified ? <Check /> : <X />}
                </span>
              </TableCell>
              <TableCell>{payemnt?.amount}</TableCell>
              <TableCell>
                <span
                  className={`${payemnt?.paymentStatus == "Paid" ? "text-green-500" : "text-blue-500"}`}
                >
                  {payemnt?.paymentStatus}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
