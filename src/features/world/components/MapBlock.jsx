"use client";

import { useMemo } from "react";

import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

function MapBlock({ countries }) {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./WorldMap"), {
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );

  return <ClientMap countries={countries} />;
}

export default MapBlock;
