"use client";
import { Button } from "@/components/button";

export const Toolbar = (props: any) => {
  return (
    <div className={"flex"}>
      <Button className={"flex border border-gray-300 px-1.5 py-0.5 italic"}>
        B
      </Button>
    </div>
  );
};
