import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

export default function Index() {
  const List = dynamic(() => import("../components/List/List"));
  return (
<div>
    <List />
  </div>
  );
}
