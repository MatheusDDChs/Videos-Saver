import { CornerDownLeft  } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function VideoPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "Sem título";
  const link = searchParams.get("link") || "";

function getEmbedLink(originalLink: string): string {
  const url = new URL(originalLink);
  const videoId = url.searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}`;
}

  const navigate = useNavigate()

    function onReturnButton() {
    navigate(`/`)
  }

  return (
    <div className='w-full h-full bg-slate-300 justify-center p-5 text-center space-y-5'>

      <header className="flex gap-10 justify-center">

        <button onClick={()=> onReturnButton()}
        className="cursor-pointer"><CornerDownLeft /></button>

        <h1 className="text-2xl font-bold mb-4">{title}</h1>

      </header>


      {link ? (
        <iframe
         src={getEmbedLink(link)}
          title={title}
          className="w-full min-h-lvh rounded shadow bg-slate-300"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p className="text-red-500">Link inválido.</p>
      )}
    </div>
  );
}

export default VideoPage;
