import { useState, useEffect } from "react";
import AddVideoForm from "./components/addVideos.tsx";
import Videos from "./components/Videos.tsx";
import { v4 as uuidv4 } from "uuid";

type Video = {
  id: string;
  title: string;
  link: string;
  isCompleted: boolean;
};

function App() {
  const [videos, setVideo] = useState<Video[]>(() => {
    const saved = localStorage.getItem("videos");
    return saved ? JSON.parse(saved) : [];
  });

  function onVideoClick(videoId: string) {
    const newVideo = videos.map((video) => {
      if (video.id == videoId) {
        return { ...video, isCompleted: !video.isCompleted };
      }
      return video;
    });
    setVideo(newVideo);
  }

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // APAGAR OS VIDEOS QUE FORAM ADICIONADOS
  const handleDeleteVideo = (id: string) => {
    setVideo((prev) => prev.filter((video) => video.id !== id));
  };

  // function onDeleteVideo(videoId: number) {
  //   const newVideos = videos.filter(video => video.id !== videoId);
  //   setVideo(newVideos);

  const addVideosSubmit = (title: string, link: string) => {
    const id = uuidv4();
    console.log("ID gerado:", id);

    const newVideo = {
      id,
      title,
      link,
      isCompleted: false,
    };
    setVideo([...videos, newVideo]);
  };

  return (
    <div className="w-screen h-screen bg-slate-500 justify-center p-5 text-center space-y-5">
      <AddVideoForm addVideosSubmit={addVideosSubmit} />

      <Videos
        videos={videos}
        onVideoClick={onVideoClick}
        onDeleteVideo={handleDeleteVideo}
      />
    </div>
  );
}

export default App;
