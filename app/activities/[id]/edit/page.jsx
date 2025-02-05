import { getActivityById } from "@/app/(actions)/activitiesActions";
import ActivityEditionBlock from "@/app/(components)/ActivityMap/ActivityEditionBlock";
import LocationBlock from "@/app/(components)/ActivityMap/ActivityEditionBlock";
import Dropdown from "@/app/(components)/Dropdown";
import { activity_types_icons } from "@/app/Utilities/Icons/Icons";

async function EditActivityPage({ params }) {
  const activity = await getActivityById(params.id);

  return <ActivityEditionBlock activity={activity} />;
}

export default EditActivityPage;
