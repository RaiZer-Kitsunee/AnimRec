"use client";
import { fetchOneAnimeData } from "@/Service/fetch_data";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimePage() {
  const [fetchedAnime, setFetchedAnime] = useState<Media | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInList, setIsInList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const param = useParams();
  const animeId = Number(param.id);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchOneAnimeData({ anime_id: animeId });
      setFetchedAnime(response.data);
    } catch (err) {
      console.error("Error fetching anime:", err);
      setError("Failed to load anime data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (animeId) {
      handleFetch();
    }
  }, [animeId]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={handleFetch}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!fetchedAnime) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">No anime data available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-950 text-gray-100 overflow-y-auto pl-10">
      {/* Banner Section */}
      <div className="relative h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fetchedAnime.bannerImage})` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
          <div className="flex items-center gap-6 w-full">
            {/* Cover Image */}
            <div className="relative shrink-0 transform translate-y-12">
              <img
                src={fetchedAnime.coverImage.extraLarge}
                alt={fetchedAnime.title.english || fetchedAnime.title.romaji}
                className="w-48 h-72 object-cover rounded-lg shadow-2xl"
              />
            </div>

            {/* Title and Actions */}
            <div className="grow pb-4">
              <h1 className="text-4xl font-bold mb-2">
                {fetchedAnime.title.english || fetchedAnime.title.romaji}
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                {fetchedAnime.title.native}
              </p>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Now
                </button>
                <button
                  onClick={() => setIsInList(!isInList)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                    isInList
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {isInList ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                  {isInList ? "In List" : "Add to List"}
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorite
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Stats */}
            <div className="shrink-0 pb-4">
              <div className="bg-gray-900/80 backdrop-blur rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-2xl font-bold">
                    {fetchedAnime.averageScore}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    {fetchedAnime.popularity.toLocaleString()} users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-800 mb-8">
          {["overview", "characters", "stats", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {activeTab === "overview" && (
              <>
                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Synopsis</h2>
                  <div
                    className="text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: fetchedAnime.description,
                    }}
                  />
                </div>

                {/* Characters */}
                {fetchedAnime.characters.edges.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Characters</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {fetchedAnime.characters.edges
                        .slice(0, 6)
                        .map((char, idx) => (
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
                              <div className="font-medium">
                                {char.node.name.full}
                              </div>
                              <div className="text-sm text-gray-400">
                                {char.role}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Relations */}
                {fetchedAnime.relations.edges.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Relations</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {fetchedAnime.relations.edges.map((rel, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer flex-shrink-0"
                        >
                          <img
                            src={rel.node.coverImage.large}
                            alt={rel.node.title.romaji}
                            className="w-32 h-48 object-cover"
                          />
                          <div className="p-3 w-32">
                            <div className="text-xs text-blue-400 mb-1">
                              {rel.relationType}
                            </div>
                            <div className="text-sm font-medium line-clamp-2">
                              {rel.node.title.romaji}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "characters" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">All Characters</h2>
                <div className="grid grid-cols-2 gap-4">
                  {fetchedAnime.characters.edges.map((char, idx) => (
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
                  ))}
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Statistics</h2>
                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Score</span>
                    <span className="font-semibold">
                      {fetchedAnime.averageScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Popularity</span>
                    <span className="font-semibold">
                      #{Math.floor(fetchedAnime.popularity / 1000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Members</span>
                    <span className="font-semibold">
                      {fetchedAnime.popularity.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
                <div className="text-gray-400 text-center py-8">
                  No reviews yet
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info */}
            <div className="bg-gray-900 rounded-lg p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                </svg>
                <span className="text-gray-400">Format:</span>
                <span className="ml-auto">{fetchedAnime.format}</span>
              </div>
              {fetchedAnime.episodes && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
                  </svg>
                  <span className="text-gray-400">Episodes:</span>
                  <span className="ml-auto">{fetchedAnime.episodes}</span>
                </div>
              )}
              {fetchedAnime.duration && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6l4 2"
                    />
                  </svg>
                  <span className="text-gray-400">Duration:</span>
                  <span className="ml-auto">{fetchedAnime.duration} min</span>
                </div>
              )}
              {fetchedAnime.season && (
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                      strokeWidth="2"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                  </svg>
                  <span className="text-gray-400">Season:</span>
                  <span className="ml-auto">{fetchedAnime.season}</span>
                </div>
              )}
              <div className="flex items-start gap-2 text-sm">
                <span className="text-gray-400">Status:</span>
                <span className="ml-auto text-right">
                  {fetchedAnime.status}
                </span>
              </div>
            </div>

            {/* Genres */}
            {fetchedAnime.genres.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-5">
                <h3 className="font-semibold mb-3">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {fetchedAnime.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm hover:bg-blue-600/30 cursor-pointer transition-colors"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Studios */}
            {fetchedAnime.studios.nodes.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-5">
                <h3 className="font-semibold mb-3">Studios</h3>
                <div className="space-y-2">
                  {fetchedAnime.studios.nodes.map((studio, idx) => (
                    <div
                      key={idx}
                      className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
                    >
                      {studio.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
