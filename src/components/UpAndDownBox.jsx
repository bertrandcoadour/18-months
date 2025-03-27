import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";

function UpAndDownBox({ label, subLabel, selected, isAscending }) {
  const router = useRouter();
  const params = useSearchParams();

  const [isUp, setIsUp] = useState(isAscending);

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    let sortOrder = "desc";
    if (isUp) {
      sortOrder = "desc";
      setIsUp(false);
    } else {
      sortOrder = "asc";
      setIsUp(true);
    }

    const updatedQuery = {
      ...currentQuery,
      sort_by: label,
      sort_order: sortOrder,
    };

    const url = qs.stringifyUrl(
      {
        url: "/activities",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router, isUp]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-row w-full max-w-60 min-w-44  hover:text-neutral-500 transition cursor-pointer ${
        selected ? "text-neutral-500" : "text-neutral-200"
      }`}
    >
      <div className="font-medium text-xs  p-2">{subLabel}</div>
      <FontAwesomeIcon
        icon={isUp ? faUpLong : faDownLong}
        className=" pl-2 pt-5 text-sm self-start"
      />
    </div>
  );
}

export default UpAndDownBox;
