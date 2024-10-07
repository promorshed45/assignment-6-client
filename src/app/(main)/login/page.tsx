"use client";
import React, { Suspense } from "react";
import Login from "./_components/Login";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </div>
  );
}
