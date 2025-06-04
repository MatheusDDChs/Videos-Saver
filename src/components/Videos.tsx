import { ChevronRightIcon, Trash, CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

  type Video = {
    id: string;
    title: string;
    link: string;
    isCompleted: boolean
  };

type VideosProps = {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
  onDeleteVideo: (videoId: string) => void;
};


function Videos({ videos , onVideoClick, onDeleteVideo}: VideosProps) {

  

  const navigate = useNavigate()

  function onShowVideoClick(videos:Video) {
    navigate(`/video?title=${videos.title}&link=${videos.link}`)
  }

  return (
    <div>
      <ul className="space-y-2 bg-amber-100 rounded-2xl p-6 flex flex-col w-lg center justify-self-center gap-3 shadow">

      {/*  TYPESCRIPT */}
        {videos.map((video) => (
          <ul className="flex justify-between gap-3">
            <li key={video.id} className=" bg-slate-500 p-6 rounded-md shadow gap-3 w-full text-left">
              
              <a
                href={video.link}
                rel="noopener noreferrer"
                className={`text-white font-bold hover:underline flex gap-3
                 ${video.isCompleted && "line-through"}`}
                onClick={() => {onVideoClick(video.id)}}
              >
                {video.title}
                {video.isCompleted ? <CheckCircle/> : <Circle/>}
              </a>
            
            
            </li>

            <button onClick={() => onShowVideoClick(video)}
            className="cursor-pointer text-white bg-slate-500 p-3 px-5 rounded-md shadow">
              <ChevronRightIcon/>
            </button>

            <button onClick={() => onDeleteVideo(video.id)}
             className="cursor-pointer text-white bg-slate-500 p-3 px-5 rounded-md shadow">
              <Trash />
            </button>

          </ul>
          
        ))}

      </ul>
    </div>
  );
}

export default Videos;
