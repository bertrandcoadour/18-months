"use client";

import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import qs from "query-string";

function TypeBox({
  icon,
  label,
  subLabel,
  description,
  occurrences,
  selected,
}) {
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //if there is any other filter when changing selected activity, remove it
    if (params?.get("sort_by")) delete currentQuery.sort_by;
    if (params?.get("sort_order")) delete currentQuery.sort_order;
    if (params?.get("search")) delete currentQuery.search;

    const updatedQuery = {
      ...currentQuery,
      sport: label,
      subSport: subLabel,
    };

    if (
      params?.get("sport") === label &&
      params?.get("subSport") === subLabel
    ) {
      delete updatedQuery.sport;
      delete updatedQuery.subSport;
    }

    if (label === "All") {
      delete updatedQuery.sport;
      delete updatedQuery.subSport;
    }

    const url = qs.stringifyUrl(
      {
        url: path,
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, subLabel, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col w-full max-w-20 items-center justify-between gap-2 lg:gap-1 p-2 lg:p-1 border-b-2 hover:text-neutral-500 transition cursor-pointer ${
        selected ? "border-b-neutral-500" : "border-transparent"
      } ${selected ? "text-neutral-500" : "text-neutral-200"}`}
    >
      <FontAwesomeIcon icon={icon} className="icon " />
      <div className="font-medium text-xs text-center max-md:hidden ">
        {description}
      </div>
      <div className="font-medium text-xs text-center">
        {occurrences && `(${occurrences})`}
      </div>
    </div>
  );
}

export default TypeBox;
