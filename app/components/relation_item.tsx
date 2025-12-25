import Link from "next/link";

export default function RelationItem({
  idx,
  rel,
}: {
  idx: number;
  rel: MediaRelation;
}) {
    
  return (
    <Link href={`/anime/${rel.node.id}`} key={idx}>
      <div className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer flex-shrink-0">
        <img
          src={rel.node.coverImage.large}
          alt={rel.node.title.romaji}
          className="w-32 h-48 object-cover"
        />
        <div className="p-3 w-32">
          <div className="text-xs text-blue-400 mb-1">{rel.relationType}</div>
          <div className="text-sm font-medium line-clamp-2">
            {rel.node.title.romaji}
          </div>
        </div>
      </div>
    </Link>
  );
}
