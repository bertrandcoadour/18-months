import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function InfoCard({ icon, title, subTitle }) {
//   return (
//     <div className="flex flex-row  justify-center items-center gap-4 p-4">
//       <FontAwesomeIcon icon={icon} size="2xl" className="icon " />
//       <div className="flex flex-col">
//         <div className="font-medium text-2xl self-center max-w-56">{title}</div>
//         <div className="font-medium text-xs self-center">{subTitle}</div>
//       </div>
//     </div>
//   );
// }

export default function InfoCard({ icon, title, subTitle }) {
  const getFontSize = (length) => {
    if (length > 20) {
      return "text-sm"; // Smaller font for long titles
    } else if (length > 10) {
      return "text-xl";
    } else {
      return "text-2xl"; // Default font size
    }
  };

  const titleFontSize = getFontSize(title.length);

  return (
    <div className="flex flex-row justify-center items-center gap-4 p-4 max-w-md">
      <FontAwesomeIcon icon={icon} size="2xl" className="icon" />
      <div className="flex flex-col min-w-0">
        <div
          className={`font-medium self-center text-center break-words overflow-hidden ${titleFontSize} min-h-8`}
        >
          {title}
        </div>
        <div className="font-medium text-xs self-center text-center break-words overflow-hidden">
          {subTitle}
        </div>
      </div>
    </div>
  );
}
