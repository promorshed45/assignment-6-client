"use client";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import moment from "moment";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useGetAllVerifyInFoQuery } from "@/src/redux/features/userVerify/verifyApi";

const PaymentManagement = () => {
  const { data: verifyedInFo, isLoading } = useGetAllVerifyInFoQuery(undefined);
  const { register, handleSubmit, watch } = useForm();

  const months = moment.months();
  const monthOptions = months.map((month) => ({ key: month, label: month }));

  const selectedMonth = watch("month");

  const filteredData = verifyedInFo?.data?.filter((item: any) => {
    const itemMonth = moment(item.date).format("MMMM"); 
    return selectedMonth ? itemMonth === selectedMonth : true;
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log("Form submitted with:", data);
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="w-[200px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              label="Select a month"
              {...register("month")}
              size="sm"
              variant="bordered"
            >
              {monthOptions.map((month) => (
                <SelectItem key={month.key} value={month.key}>
                  {month.label}
                </SelectItem>
              ))}
            </Select>
          </form>
        </div>
      </div>

      {/* Table */}
      <Table isHeaderSticky isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Email</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Transaction Id</TableColumn>
          <TableColumn>Processor</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner label="Loading..." />}>
          {filteredData?.map((item: any) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.user?.email}</TableCell>
              <TableCell>{moment(item?.date).format("lll")}</TableCell>
              <TableCell>{item?.totalPay}</TableCell>
              <TableCell>{item?.transactionId}</TableCell>
              <TableCell>{item?.payment_processor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PaymentManagement;
