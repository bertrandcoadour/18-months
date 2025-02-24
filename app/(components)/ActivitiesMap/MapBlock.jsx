"use client";

import { useMemo, useEffect, useState } from "react";

import dynamic from "next/dynamic";

function MapBlock({ countries }) {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./WorldMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return <ClientMap countries={countries} />;
}

export default MapBlock;
