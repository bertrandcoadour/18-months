import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteActivities } from "../(actions)/activitiesActions";

const DeleteBlock = ({ id }) => {
  const deleteActivity = async () => {
    await deleteActivities(id);
  };

  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="self-center hover:cursor-pointer hover:text-red-400"
      onClick={deleteActivity}
    />
  );
};

export default DeleteBlock;
