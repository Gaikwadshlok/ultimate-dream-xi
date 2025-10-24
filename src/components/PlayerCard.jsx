import React from "react";
import { useDrag } from "react-dnd";

const PlayerCard = ({ player, selectedPlayers = [], onSelect }) => {
  const isAlreadySelected = selectedPlayers.some(p => p.id === player.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "player",
    item: player,
    canDrag: !isAlreadySelected,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [selectedPlayers]);

  const handleClick = () => {
    if (isAlreadySelected) return;
    onSelect(player);
  };

  const cardWidth = "330px";
  const cardHeight = "60px";

  return (
    <div
      ref={drag}
      onClick={handleClick}
      style={{ width: cardWidth, height: cardHeight }}
      className={`bg-gray-700 text-white rounded-md cursor-pointer shadow-md transition-all duration-200 ${
        isDragging ? "opacity-30" : ""
      } ${isAlreadySelected ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
    >
      <div className="flex flex-col justify-center items-start h-full p-2">  {/* Changed items-center to items-start */}
        <h3 className="font-bold text-sm">{player.name}</h3>
        <p className="text-xs">{player.position}</p>
      </div>
    </div>
  );
};

export default PlayerCard;