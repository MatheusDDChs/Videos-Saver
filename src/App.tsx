import { useState, useEffect } from "react";
import AddVideoForm from "./components/addVideos";
import Videos from "./components/Videos";
import Groups from "./components/Groups";
import { v4 as uuidv4 } from "uuid";

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

function App() {
  // ======= GRUPOS =======
  const [groups, setGroups] = useState<Group[]>(() => {
    const saved = localStorage.getItem("groups");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  function handleAddGroup(name: string) {
    if (!name.trim()) return;
    const newGroup = { id: uuidv4(), name: name.trim() };
    setGroups((prev) => [...prev, newGroup]);
  }

  function handleSelectGroup(id: string | null) {
    setSelectedGroupId(id);
  }

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  // ======= VIDEOS =======
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem("videos");
    return saved ? JSON.parse(saved) : [];
  });

  function onVideoClick(videoId: string) {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId
          ? { ...video, isCompleted: !video.isCompleted }
          : video
      )
    );
  }

  function handleAddVideo(
    title: string,
    link: string,
    groupId: string | null = null
  ) {
    if (!title.trim() || !link.trim()) return;
    const newVideo: Video = {
      id: uuidv4(),
      title,
      link,
      isCompleted: false,
      groupId,
    };
    setVideos((prev) => [...prev, newVideo]);
  }

  function handleAssignGroup(videoId: string, groupId: string | null) {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === videoId ? { ...video, groupId } : video
      )
    );
  }

  function handleDeleteVideo(id: string) {
    setVideos((prev) => prev.filter((video) => video.id !== id));
  }

  // ======= LOCALSTORAGE =======
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // ======= FILTRAR VIDEOS =======
  const filteredVideos =
    selectedGroupId === null
      ? videos // mostra todos
      : videos.filter((v) => v.groupId === selectedGroupId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-mono">
      <header className="bg-slate-800 py-4 shadow-md text-center text-2xl font-bold tracking-wider">
        🎬 Video-Saver
      </header>

      <main className=" flex-col lg:flex-row items-center  text-center flex justify-center gap-2 mt-8">
        {/* ======= FORMULÁRIO ======= */}
        <div className="flex flex-col w-md p-4 items-center">
          <AddVideoForm
            addVideosSubmit={(title, link) =>
              handleAddVideo(title, link, selectedGroupId)
            }
            selectedGroupId={selectedGroupId}
            selectedGroupName={selectedGroup ? selectedGroup.name : null}
          />

          {/* ======= GRUPOS ======= */}
          <Groups
            groups={groups}
            selectedGroupId={selectedGroupId}
            onAddGroup={handleAddGroup}
            onSelectGroup={handleSelectGroup}
          >
            <h1 className="text-lg font-bold mb-2">Meus grupos</h1>
          </Groups>
        </div>

        <div className="w-auto1 bg-slate-600"></div>

        {/* ======= VÍDEOS ======= */}
        <Videos
          videos={filteredVideos}
          groups={groups}
          onVideoClick={onVideoClick}
          onDeleteVideo={handleDeleteVideo}
          onAssignGroup={handleAssignGroup}
        />
      </main>

      <footer className="bg-slate-800 py-3 text-center text-sm mt-auto w-full">
        © 2025 Desenvolvido por{" "}
        <span className="font-bold">Matheus Diedrichs</span>
      </footer>
    </div>
  );
}

export default App;
