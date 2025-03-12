import { getActivityById } from "@/app/(actions)/activitiesActions";
import InfoLine from "@/app/(components)/SimpleCard";
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
      <div className="flex  justify-around md:justify-between">
        <div className="flex lg:gap-14 md:gap-7 gap-5">
          <span className="pl-3 self-center ">
            <FontAwesomeIcon
              size="2xl"
              icon={getActivityIcon(activity.sport, activity.subSport)}
            />
          </span>
          <div className="flex flex-col  md:flex-row  gap-x-14">
            <div className="text-xl md:text-2xl lg:text-3xl font-normal p-1 text-center">
              {activity.title}
            </div>
            <div className="flex gap-2 self-center ">
              <div className="max-md:hidden p-1">
                <FontAwesomeIcon icon={faLocationDot} size="xl" />
              </div>

              <span className="text-sm md:text-base lg:text-xl font-normal p-1 text-center">
                {activity.city + ", " + activity.country}
              </span>
            </div>
          </div>
        </div>
        <Link
          className="self-center hover:cursor-pointer hover:text-slate-900 pl-3"
          href={`/activities/${activity.id}/edit`}
        >
          <label className="pr-2 hover:cursor-pointer max-lg:hidden">
            Edit
          </label>
          <FontAwesomeIcon icon={faPen} />
        </Link>
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
      <MapBlock activity={activity} />
    </div>
  );
}

export default ActivityPage;
