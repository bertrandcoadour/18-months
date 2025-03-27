"use client";

import React, { useState } from "react";
import {
  faPen,
  faCheck,
  faXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateActivityTitle } from "../actions/activitiesActions";
import Dropdown from "./Dropdown";

function EditableTitle({ activity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(activity.title);
  const [city, setCity] = useState(activity.city);
  const [country, setCountry] = useState(activity.country);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    updateActivityTitle(activity.id, title);
  };

  const handleCancelClick = () => {
    setTitle(activity.title);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCountryChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="flex gap-10">
      <span className="text-3xl font-normal self-center">{title}</span>

      <div className="flex gap-2">
        <FontAwesomeIcon
          className="self-center"
          icon={faLocationDot}
          size="xl"
        />
        <span className="text-xl font-normal self-center">
          {city + ", " + country}
        </span>
      </div>

      <FontAwesomeIcon
        icon={faPen}
        className="hover:cursor-pointer hover:text-gray-800 self-center"
        onClick={openModal}
      />
    </div>
  );
}

export default EditableTitle;
