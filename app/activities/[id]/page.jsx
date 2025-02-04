import { getActivityById } from "@/app/(actions)/activitiesActions";
import Info from "@/app/(components)/Info";
import { convertTimestampToDate } from "@/app/Utilities/Global/convertData";
import { getActivityIcon } from "@/app/Utilities/Icons/Icons";
import { info_to_display } from "@/app/Utilities/InfoToDisplay/InfoToDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapBlock from "@/app/(components)/ActivityMap/MapBlock";
import EditableTitle from "@/app/(components)/EditableTitle";

async function ActivityPage({ params }) {
  const activity = await getActivityById(params.id);

  return (
    <div className="flex flex-col h-full gap-2 p-4">
      <div className="flex flex-row gap-14">
        <div className="self-center pl-3">
          <FontAwesomeIcon
            size="2xl"
            icon={getActivityIcon(activity.sport, activity.subSport)}
          />
        </div>
        {/* <div className="text-3xl font-normal">
          {convertTimestampToDate(activity.timestamp)}
        </div> */}
        <EditableTitle activity={activity} />
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

      {/* <div className="flex flex-row">
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
            <MapBlock activity={activity} selectedDistance={selectedDistance} />
            <ChartsBlok activity={activity} />
          </div>
          selectedDistance
        </div>
        <div className="flex-1">
          <PaceChart
            activity={activity}
            onKmSelected={handleDistanceSelected}
          />
        </div>
      </div> */}
    </div>
  );
}

export default ActivityPage;
