export default function CharacterItem({
  idx,
  char,
}: {
  idx: number;
  char: MediaCharacter;
}) {
  return (
    <div
      key={idx}
      className="flex gap-3 bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <img
        src={char.node.image.large}
        alt={char.node.name.full}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <div className="font-medium">{char.node.name.full}</div>
        <div className="text-sm text-gray-400">{char.role}</div>
      </div>
    </div>
  );
}
