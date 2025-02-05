import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

function TypeBox({ icon, label, subLabel, description, selected }) {
  const router = useRouter();
  const params = useSearchParams();

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
        url: "/activities",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, subLabel, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-500 transition cursor-pointer ${
        selected ? "border-b-neutral-500" : "border-transparent"
      } ${selected ? "text-neutral-500" : "text-neutral-200"}`}
    >
      <FontAwesomeIcon icon={icon} className="icon " />
      <div className="font-medium text-xs">{description}</div>
    </div>
  );
}

export default TypeBox;
