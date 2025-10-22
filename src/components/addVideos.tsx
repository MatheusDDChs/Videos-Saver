import { useState } from "react";
import Input from "./Input";
import Button from "./button";

type Props = {
  addVideosSubmit: (
    title: string,
    link: string,
    groupId: string | null
  ) => void;
  selectedGroupId: string | null;
  selectedGroupName: string | null;
};

function AddVideoForm({
  addVideosSubmit,
  selectedGroupId,
  selectedGroupName,
}: Props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) {
      window.alert("Por favor, adicione um título e um link.");
      return;
    }

    addVideosSubmit(title.trim(), link.trim(), selectedGroupId);
    setTitle("");
    setLink("");
  };

  return (
    <form
      className="flex-1 flex-col p-6 bg-slate-800 rounded text-center justify-center w-[100%] "
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl mb-4 font-semibold text-center text-white">
        Adicionar Vídeo
      </h2>

      <div className="flex items-center gap-3 flex-col mb-4">
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
          placeholder="Link do vídeo (YouTube, etc)"
        />
      </div>

      <div className="mb-3 text-slate-300 text-sm">
        Grupo selecionado:{" "}
        <span className="font-semibold">
          {selectedGroupName ? selectedGroupName : "Nenhum"}
        </span>
      </div>

      <Button type="submit">{"Enviar"}</Button>
    </form>
  );
}

export default AddVideoForm;
