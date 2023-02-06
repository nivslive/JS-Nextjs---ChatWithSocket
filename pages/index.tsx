import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NextComponentType } from "next";

export default function Index() {
  const List: any = dynamic(() => import("../components/List/List"));
  const Logo: any = dynamic(() => import("../components/Logo/Logo"));
  const Code: any = dynamic(
    () => import('../components/Code/index'),
    { ssr: false }
  )
  return (
  <div>
    <Logo />
    <Code />
    <List listInsideChat={false} />
  </div>
  );
}
