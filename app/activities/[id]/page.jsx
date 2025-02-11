import { getActivityById } from "@/app/(actions)/activitiesActions";
import Info from "@/app/(components)/Info";
import { getActivityIcon } from "@/app/Utilities/Icons/Icons";
import { info_to_display } from "@/app/Utilities/InfoToDisplay/InfoToDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapBlock from "@/app/(components)/ActivityMap/MapBlock";
import { faPen, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

async function ActivityPage({ params }) {
  const { id } = await params;
  const activity = await getActivityById(id);

  return (
    <div className="flex flex-col h-full gap-2 p-4">
      <div className="flex  justify-between">
        <div className="flex items-center gap-14">
          <span className="pl-3">
            <FontAwesomeIcon
              size="2xl"
              icon={getActivityIcon(activity.sport, activity.subSport)}
            />
          </span>
          <span className="text-3xl font-normal">{activity.title}</span>
          <div className="flex gap-2">
            <FontAwesomeIcon
              className="self-center"
              icon={faLocationDot}
              size="xl"
            />
            <span className="text-xl font-normal">
              {activity.city + ", " + activity.country}
            </span>
          </div>
        </div>
        <Link
          className="self-center hover:cursor-pointer hover:text-slate-900"
          href={`/activities/${activity.id}/edit`}
        >
          <label className="pr-2 hover:cursor-pointer">Edit</label>
          <FontAwesomeIcon icon={faPen} />
        </Link>
      </div>
      <hr className="h-px border-1 bg-activityList mb-2" />

      <div className="flex-1">
        <div className="flex flex-row pb-2">
          {info_to_display.map(
            (info) =>
              activity.sport === info.sport &&
              activity.subSport === info.subSport &&
              info.items.map((item, index) => (
                <Info
                  key={index}
                  activity={activity}
                  title={item.title}
                  subTitle={item.subTitle}
                  unit={item.unit}
                />
              ))
          )}
        </div>
        <div className="flex flex-col w-full max-w-4x gap-2">
          <MapBlock activity={activity} />
        </div>
      </div>
    </div>
  );
}

export default ActivityPage;
