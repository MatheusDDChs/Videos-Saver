import { useState } from "react";
import Input from "./Input";

type Props = {
  addVideosSubmit: (title: string, link: string) => void;
};

function AddVideoForm({ addVideosSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) {
      return window.alert("Por favor, adicione algum Título e Link.");
    }

    addVideosSubmit(title, link);
    setTitle(""); // limpa os campos
    setLink("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 bg-amber-100 rounded-2xl p-6 flex flex-col w-lg justify-self-center gap-3 shadow items-center"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        id="videoTitle"
        placeholder="Título"
      />

      <Input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        type="text"
        id="videoLink"
        placeholder="Link"
      />

      <button
        id="addButton"
        type="submit"
        className="cursor-pointer text-white w-96 bg-slate-500 p-3 px-5 rounded shadow font-bold"
      >
        Adicionar Vídeo
      </button>
    </form>
  );
}

export default AddVideoForm;
