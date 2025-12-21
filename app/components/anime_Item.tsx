import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function AnimeItem({
  index,
  data,
}: {
  index: number;
  data: Media;
}) {
  return (
    <Link href={`/anime/${data.id}`}>
      <div
        key={index}
        className="border-2 rounded-md flex flex-col overflow-hidden cursor-pointer hover:border-black transition-all duration-300 "
      >
        <div className="w-full aspect-2/3 overflow-hidden relative">
          <img
            src={data.coverImage.large!}
            alt={data.title.english || data.title.native || "Anime cover"}
            className="w-full h-full object-cover"
          />
          <div className="flex flex-col items-center text-center p-3 absolute">
            <h3 className="line-clamp-2 text-sm font-medium">
              {data.title.english || data.title.native}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
