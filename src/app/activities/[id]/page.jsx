import { getActivityById } from "@/src/actions/activitiesActions";
import InfoLine from "@/src/components/SimpleCard";
import { getActivityIcon } from "@/src/utils/Icons/Icons";
import { info_to_display } from "@/src/utils/InfoToDisplay/InfoToDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapBlock from "@/src/features/activity/components/ActivityMap/MapBlock";
import { faPen, faLocationDot, faBan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

async function ActivityPage({ params }) {
  const { id } = await params;
  const activity = await getActivityById(id);

  const displayMap = info_to_display.find(
    (info) => info.sport == activity.sport && info.subSport == activity.subSport
  )?.enable_map;

  const displayEdition = info_to_display.find(
    (info) => info.sport == activity.sport && info.subSport == activity.subSport
  )?.enable_edition;

  return (
    <div className="flex flex-col h-full gap-2 p-2">
      <div className="flex  justify-around md:justify-between">
        <div className="flex lg:gap-14 md:gap-7 gap-5 items-center">
          <span className="pl-3 self-center ">
            <FontAwesomeIcon
              size="2xl"
              icon={getActivityIcon(activity.sport, activity.subSport)}
            />
          </span>
          <div className="flex flex-col  md:flex-row  gap-x-14 items-center">
            <div className="text-xl md:text-2xl lg:text-3xl font-normal p-1 text-center">
              {activity.title}
            </div>
            {activity.city && activity.country && (
              <div className="flex gap-2 items-center ">
                <div className="flex max-md:hidden p-1 self-center">
                  <FontAwesomeIcon icon={faLocationDot} size="xl" />
                </div>

                <span className="text-sm md:text-base lg:text-xl font-normal p-1 text-center">
                  {activity.city + ", " + activity.country}
                </span>
              </div>
            )}
          </div>
        </div>
        {displayEdition && (
          <Link
            className="self-center hover:cursor-pointer hover:text-slate-900 pl-3"
            href={`/activities/${activity.id}/edit`}
          >
            <label className="pr-2 hover:cursor-pointer max-lg:hidden">
              Edit
            </label>
            <FontAwesomeIcon icon={faPen} />
          </Link>
        )}
      </div>
      <hr className="h-px border-1 bg-activityList mb-2" />

      <div className="grid grid-cols-3 md:grid-cols-6 pb-2">
        {info_to_display.map(
          (info) =>
            activity.sport === info.sport &&
            activity.subSport === info.subSport &&
            info.items.map((item, index) => (
              <InfoLine
                key={index}
                activity={activity}
                title={item.title}
                subTitle={item.subTitle}
                unit={item.unit}
              />
            ))
        )}
      </div>
      {displayMap && <MapBlock activity={activity} />}
      {!displayMap && (
        <div className="flex flex-col h-screen gap-4 justify-center">
          <div className="flex flex-row gap-4 self-center">
            <FontAwesomeIcon icon={faBan} size="2xl" className="icon " />
            <h3>No map and charts to display.</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActivityPage;
