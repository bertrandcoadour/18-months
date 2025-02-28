"use client";

import { useMemo } from "react";

import dynamic from "next/dynamic";

function MapBlock({ countries }) {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./WorldMap"), {
        loading: () => (
          <div className="flex items-center justify-center gap-2 mx-auto h-full">
            <h3 className="font-semibold  py-2 px-4 ">Loading...</h3>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return <ClientMap countries={countries} />;
}

export default MapBlock;
