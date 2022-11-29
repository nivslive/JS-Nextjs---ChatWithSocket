import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Index() {
  const List = dynamic(() => import("../components/List/List"));
  const Logo = dynamic(() => import("../components/Logo/Logo"));
  return (
<div>
    <Logo />
    <List listInsideChat={false} />
  </div>
  );
}
