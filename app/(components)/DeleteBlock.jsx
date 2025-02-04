"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteActivities } from "../(actions)/activitiesActions";

const DeleteBlock = ({ id }) => {
  const deleteActivity = async () => {
    //console.log("deleting act ", id);
    await deleteActivities(id);
  };

  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="hover:cursor-pointer hover:text-red-200"
      onClick={deleteActivity}
    />
  );
};

export default DeleteBlock;
