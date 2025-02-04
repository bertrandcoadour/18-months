"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";

function MapBlock({ activities }) {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./WorldMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  let countries = [];
  //let countries = ["France", "Argentina", "Peru", "Indonesia"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <ClientMap countries={countries} />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default MapBlock;
