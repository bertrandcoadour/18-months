import {
  faHome,
  faPersonRunning,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/map">
          <FontAwesomeIcon icon={faMap} className="icon" />
        </Link>
        <Link href="/activities">
          <FontAwesomeIcon icon={faPersonRunning} className="icon" />
        </Link>
      </div>
      <div>
        <p className="text-default-text"> email@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
