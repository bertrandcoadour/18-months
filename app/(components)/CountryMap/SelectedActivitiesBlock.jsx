"use client";

import { faBan } from "@fortawesome/free-solid-svg-icons";
import ActivityRow from "../ActivityRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SelectedActivitiesBlock({ selectedActivities }) {
  return (
    <div className="flex w-full px-1 overflow-x-hidden overflow-y-auto justify-center p-4">
      {selectedActivities.length < 1 && (
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex flex-row gap-4">
            <FontAwesomeIcon icon={faBan} size="2xl" className="icon " />
            <h3>No activity selected !</h3>
          </div>
          <h6 className="font-light text-sm self-center">
            Select activities on the map for more info
          </h6>
        </div>
      )}

      <ul className="leading-8">
        {selectedActivities.map((activity, index) => (
          <li
            key={activity.id}
            className=" group/item bg-activityList hover:bg-activityList-hover rounded-md  p-1 m-1"
          >
            <ActivityRow activity={activity} size={"half"} />
          </li>
        ))}
      </ul>
      <div className="flex flex-row"></div>
    </div>
  );
}

export default SelectedActivitiesBlock;
