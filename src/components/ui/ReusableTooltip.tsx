'use client'
import { Tooltip } from "@nextui-org/react";

const ReusableTooltip = ({ content, children }) => {
  return (
    <Tooltip content={content}>
      {children}
    </Tooltip>
  );
};


export default ReusableTooltip;