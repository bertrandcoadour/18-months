import MapBlock from "@/app/(components)/CountryMap/MapBlock";

export default async function CountryMap({ params }) {
  const { country } = await params;

  return (
    <div className="flex flex-row gap-2">
      <div className="flex-1">
        <MapBlock country={decodeURIComponent(country)} />
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
