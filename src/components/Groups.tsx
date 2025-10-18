import React, { useState } from "react";

type Group = {
  id: string;
  name: string;
};

type GroupsProps = {
  groups: Group[];
  selectedGroupId: string | null;
  onAddGroup: (name: string) => void;
  onSelectGroup: (id: string) => void;
  children?: React.ReactNode;
};

export default function Groups({
  groups,
  selectedGroupId,
  onAddGroup,
  onSelectGroup,
  children,
}: GroupsProps) {
  const [groupName, setGroupName] = useState("");

  return (
    <div className="block p-4 w-[100%]">
      {children}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!groupName.trim()) return;
          onAddGroup(groupName.trim());
          setGroupName("");
        }}
        className="flex gap-2 mb-4"
      >
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Novo grupo"
          className="flex-1 px-2 py-1 rounded bg-slate-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 px-3 py-1 rounded cursor-pointer hover:bg-blue-500"
        >
          +
        </button>
      </form>

      <ul className="bg-slate-800 rounded-lg shadow hover:shadow-lg transition p-4 m-1">
        <li
          onClick={() => onSelectGroup(null)}
          className={`cursor-pointer p-2 rounded mb-2 ${
            selectedGroupId === null ? "bg-slate-700" : "hover:bg-slate-700"
          }`}
        >
          Todos
        </li>

        {groups.map((group) => (
          <li
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`cursor-pointer p-2 rounded mb-2 ${
              selectedGroupId === group.id
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
