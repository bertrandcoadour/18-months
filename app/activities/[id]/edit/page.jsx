import { getActivityById } from "@/app/(actions)/activitiesActions";
import ActivityEditionBlock from "@/app/(components)/ActivityMap/ActivityEditionBlock";

async function EditActivityPage({ params }) {
  const { id } = await params;
  const activity = await getActivityById(id);

  return <ActivityEditionBlock activity={activity} />;
}

export default EditActivityPage;
