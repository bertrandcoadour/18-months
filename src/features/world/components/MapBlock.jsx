"use client";

import { useMemo } from "react";

import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { getActivitiesCountries } from "@/src/actions/activitiesActions";

function MapBlock() {
  const ClientMap = useMemo(
    () =>
      dynamic(() => import("./WorldMap"), {
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );

  const {
    data: countries,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["activitiesCountries"],
    queryFn: async () => {
      return await getActivitiesCountries();
    },
    staleTime: 1000 * 60 * 5, ////for 5min, the data is considered valid to be retrieve from cache
  });

  return (
    <>
      {isError && <span>Failed to fetch countries...</span>}
      {!isLoading && <ClientMap countries={countries} />}
    </>
  );
}

export default MapBlock;
