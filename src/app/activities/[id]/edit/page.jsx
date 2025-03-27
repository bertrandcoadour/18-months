import { getActivityById } from "@/src/actions/activitiesActions";
import ActivityEditionBlock from "@/src/features/activity/components/ActivityMap/ActivityEditionBlock";

async function EditActivityPage({ params }) {
  const { id } = await params;
  const activity = await getActivityById(id);

  return <ActivityEditionBlock activity={activity} />;
}

export default EditActivityPage;
