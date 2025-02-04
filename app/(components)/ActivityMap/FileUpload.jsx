"use client";

import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { gpxParser, checkGPXWithActivity } from "../../Utilities/map/gpxParser";

function FileUpload({ activity, submitData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dropZoneRef = useRef(null);
  const [geojsonObj, setGeojsonObj] = useState(null);
  const [enableImport, setEnableImport] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZoneRef.current.classList.add("drag-over");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZoneRef.current.classList.remove("drag-over");
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropZoneRef.current.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];
    if (!file) return;

    await checkFileValidity(file);
  };

  const handleRemoveFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedFile(null);
    setGeojsonObj(null);
    setEnableImport(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await checkFileValidity(file);
  };

  const checkFileValidity = async (file) => {
    const fileExtension = file.name.split(".").at(1);

    if (fileExtension === "gpx" || fileExtension === "xml") {
      setSelectedFile(file);
    } else {
      alert("Please select a gpx file.");
      return;
    }

    const geojson = await gpxParser(file);
    setGeojsonObj(geojson);
    const isValidFile = checkGPXWithActivity(geojson, activity);
    setEnableImport(isValidFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Selected file :", selectedFile);
    submitData(geojsonObj);
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <label htmlFor="file-input">
        <div
          className="flex flex-col border-dashed border-2 border-gray-500  max-w-xl mb-2 rounded-md hover:cursor-pointer"
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-center text-lg p-2 pb-5">
            Drag and drop gpx file here or{" "}
            <span className="text-gray-500   hover:underline hover:text-gray-400">
              Browse
            </span>{" "}
            to select a file
          </p>
          {selectedFile && (
            <div className=" gap-3 pl-2 text-sm text-center">
              {selectedFile.name}
              <FontAwesomeIcon
                icon={faTrash}
                className="self-center hover:cursor-pointer hover:text-red-400 pl-4"
                onClick={handleRemoveFile}
              />
            </div>
          )}
          {geojsonObj && enableImport && (
            <p className=" text-center  text-sm pl-2 text-green-400">
              Selected file matches the activity !
            </p>
          )}
          {geojsonObj && !enableImport && (
            <p className=" text-center  text-sm pl-2 text-red-400">
              Selected file does not match the activity.
            </p>
          )}

          <input
            id="file-input"
            type="file"
            accept=".gpx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <button
          className={`bg-blue-accent px-4 py-2 rounded-md transition ${
            geojsonObj && enableImport
              ? "cursor-pointer hover:bg-blue-accent-hover"
              : "cursor-not-allowed opacity-50"
          }`}
          disabled={!geojsonObj || !enableImport}
        >
          Import file
        </button>
      </label>
    </form>
  );
}

export default FileUpload;
