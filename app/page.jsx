import Link from "next/link";
import { faBan, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <header className="text-center mb-8 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-200 mb-4">
          18 Months, Countless Kilometers: A Global Adventure Through Data
        </h1>
        <p className="text-lg text-gray-400">
          For 18 months, I traveled the world, exploring continents on foot and
          wheels. Now, I've transformed those journeys into a digital map, a
          personal archive of every run, hike, and bike ride. Dive into the data
          and relive the adventure with me.
        </p>
        <div className="flex flex-row items-center justify-center gap-4 pt-10">
          <Link
            className="hover:cursor-pointer hover:text-slate-900"
            href={`/map`}
          >
            <button className="bg-gray-900 hover:bg-slate-800 text-white py-2 px-4 rounded-md flex items-center justify-center hover:text-white transition cursor-pointer">
              <span className="mr-2">Explore the world map</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
          <Link
            className="hover:cursor-pointer hover:text-slate-900"
            href={`/activities`}
          >
            <button className="bg-slate-200 hover:bg-gray-400 text-gray-900 py-2 px-4 rounded-md flex items-center justify-center hover:text-black transition cursor-pointer">
              <span className="mr-2">All activities</span>
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}
