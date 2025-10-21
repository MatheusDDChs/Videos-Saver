import {
  Trash,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  FolderPlus,
} from "lucide-react";
import { useState } from "react";
import Button from "./button";

type Video = {
  id: string;
  title: string;
  link: string;
  isCompleted: boolean;
  groupId: string | null;
};

type Group = {
  id: string;
  name: string;
};

type VideosProps = {
  videos: Video[];
  groups: Group[];
  onVideoClick: (videoId: string) => void;
  onDeleteVideo: (videoId: string) => void;
  onAssignGroup: (videoId: string, groupId: string | null) => void;
};

function Videos({
  videos,
  groups,
  onVideoClick,
  onDeleteVideo,
  onAssignGroup,
}: VideosProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showGroupMenu, setShowGroupMenu] = useState<string | null>(null);

  function toggleExpand(videoId: string) {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  }

  function getEmbedLink(link: string) {
    try {
      const url = new URL(link);
      if (url.hostname.includes("youtube.com")) {
        const videoId = url.searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.hostname.includes("youtu.be")) {
        const videoId = url.pathname.replace("/", "");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return link;
    } catch {
      return link;
    }
  }

  return (
    <div className="max-w-6xl">
      <h2 className="text-xl max-w-4xl mb-2 relative font-semibold text-center">
        Meus Vídeos
      </h2>

      <ul className="bg-slate-800 rounded-lg shadow hover:shadow-lg transition p-4 max-w-3xl  items">
        {videos.map((video) => {
          const isOpen = expanded.has(video.id);
          const isMenuOpen = showGroupMenu === video.id;

          const currentGroup =
            groups.find((g) => g.id === video.groupId)?.name || "Sem grupo";

          return (
            <li
              key={video.id}
              className="bg-slate-700 my-3 rounded-lg shadow p-4 flex flex-col gap-3 relative max-w-3xl "
            >
              <div className="flex justify-between items-center gap-3 ">
                <button
                  onClick={() => onVideoClick(video.id)}
                  className={`text-white font-bold flex gap-2 items-center hover:underline text-lg ${
                    video.isCompleted ? "line-through" : ""
                  }`}
                >
                  <a href={video.link} target="_blank">
                    {video.title}
                  </a>
                  <span className="cursor-pointer">
                    {video.isCompleted ? <CheckCircle /> : <Circle />}
                  </span>
                </button>

                <div className="flex gap-2 items-center">
                  <span className="text-sm text-slate-300 italic">
                    {currentGroup}
                  </span>

                  <Button
                    onClick={() =>
                      setShowGroupMenu(isMenuOpen ? null : video.id)
                    }
                  >
                    <FolderPlus />
                  </Button>

                  <Button onClick={() => toggleExpand(video.id)}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </Button>

                  <Button onClick={() => onDeleteVideo(video.id)}>
                    <Trash />
                  </Button>
                </div>
              </div>

              {isMenuOpen && (
                <ul className="absolute right-4 top-14 bg-slate-800 border border-slate-600 rounded-lg p-2 shadow-lg z-10 w-48">
                  <li
                    className="cursor-pointer hover:bg-slate-700 p-2 rounded"
                    onClick={() => {
                      onAssignGroup(video.id, null);
                      setShowGroupMenu(null);
                    }}
                  >
                    Sem grupo
                  </li>
                  {groups.map((g) => (
                    <li
                      key={g.id}
                      className="cursor-pointer hover:bg-slate-700 p-2 rounded"
                      onClick={() => {
                        onAssignGroup(video.id, g.id);
                        setShowGroupMenu(null);
                      }}
                    >
                      {g.name}
                    </li>
                  ))}
                </ul>
              )}

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[650px] mt-3" : "max-h-0"
                }`}
              >
                {isOpen && (
                  <iframe
                    src={getEmbedLink(video.link)}
                    title={video.title}
                    className="w-full h-[296px] rounded-lg"
                    allow="accelerometer; setVolume(volume:50); autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Videos;
