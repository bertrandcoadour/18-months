"use client";

import React, { useState } from "react";
import {
  faPen,
  faCheck,
  faXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateActivityTitle } from "../(actions)/activitiesActions";
import Dropdown from "./Dropdown";

function EditableTitle({ activity }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(activity.title);
  const [city, setCity] = useState(activity.city);
  const [country, setCountry] = useState(activity.country);

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
    <div>
      {isEditing ? (
        <div className="flex gap-1">
          <input
            className="text-2xl font-normal"
            type="text"
            maxLength={75}
            value={title}
            size={50}
            onChange={handleChange}
          />
          <Dropdown
            options={dropdownOptions}
            onSelect={handleCountryChange}
            defaultSelection={country}
          />
          <FontAwesomeIcon
            icon={faCheck}
            size="xl"
            className="hover:cursor-pointer hover:text-green-600 self-center"
            onClick={handleSaveClick}
          />
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            className="hover:cursor-pointer hover:text-red-600 self-center"
            onClick={handleCancelClick}
          />
        </div>
      ) : (
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
            onClick={handleEditClick}
          />
        </div>
      )}
    </div>
  );
}

export default EditableTitle;
