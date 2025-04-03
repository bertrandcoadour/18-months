"use client";

import React, { useEffect } from "react";

import Loading from "@/src/components/Loading";
import ActivityRow from "@/src/components/ActivityRow";
import { getActivities } from "@/src/actions/activitiesActions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import sortActivities from "@/src/utils/activity/activityUtilities";

function ActivityList({ params }) {
  const {
    status,
    data: activities,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["allActivities", params],
    queryFn: async (ctx) => await getActivities(params, 10, ctx.pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage &&
        lastPage.nextOffset !== null &&
        lastPage.nextOffset !== undefined
      ) {
        // Check if there are actual rows in the last page. If not, then there is no more data.
        if (!lastPage.rows || lastPage.rows.length === 0) {
          return undefined; // Or null, to stop fetching.
        }
        return lastPage.nextOffset;
      }
      return undefined; // Or null, to stop fetching.
    },
    initialPageParam: 0,
  });

  const allRows = activities ? activities.pages.flatMap((d) => d.rows) : [];

  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return (
    <div ref={parentRef} className="h-[70dvh] w-full overflow-auto">
      <div
        className="relative "
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        <div
          className="absolute top-0 left-0 w-full "
          style={{
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allRows.length - 1;
            const activity = allRows[virtualRow.index];

            return (
              <div
                className="group/item bg-activityList hover:bg-activityList-hover rounded-md  p-1 m-1"
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    "Loading more..."
                  ) : (
                    "Nothing more to load"
                  )
                ) : (
                  <ActivityRow activity={activity} size={"full"} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActivityList;
