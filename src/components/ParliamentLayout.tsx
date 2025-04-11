
import React from "react";
import PoliticalGroup from "./PoliticalGroup";
import { 
  ParliamentaryGroup, 
  Politician,
  getPoliticiansByGroup 
} from "../utils/parliamentUtils";

interface ParliamentLayoutProps {
  groups: ParliamentaryGroup[];
  politicians: Politician[];
  onPoliticianClick: (politician: Politician) => void;
}

const ParliamentLayout: React.FC<ParliamentLayoutProps> = ({
  groups,
  politicians,
  onPoliticianClick
}) => {
  // Sort groups by political orientation for the parliament layout
  const sortedGroups = [...groups].sort((a, b) => {
    const orientationOrder = {
      "Far Left": 0,
      "Left Wing": 1,
      "Center": 2,
      "Right Wing": 3,
      "Far Right": 4
    };
    
    // Get numerical values for orientations
    const aOrder = orientationOrder[a.orientation] ?? 2;
    const bOrder = orientationOrder[b.orientation] ?? 2;
    
    return aOrder - bOrder;
  });

  // Create rows for the semicircle layout
  const rows = 2; // Reduced from 3 to 2 for simplicity
  
  return (
    <div className="w-full mb-4">
      <h2 className="text-base font-medium text-center mb-3">Parliament Chamber</h2>
      
      <div className="relative parliament-chamber">
        {/* Speaker's podium */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-parliament-podium rounded-t-lg z-10" />
        
        {/* Parliament rows (semicircles) */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`flex justify-center items-center gap-2 md:gap-3 mb-2`}
            style={{
              transform: `translateZ(${-rowIndex * 10}px)`,
              opacity: 1 - rowIndex * 0.1
            }}
          >
            {sortedGroups.map((group) => {
              const groupPoliticians = getPoliticiansByGroup(group.id, politicians);
              return (
                <PoliticalGroup
                  key={group.id}
                  group={group}
                  politicians={groupPoliticians}
                  row={rowIndex}
                  onPoliticianClick={onPoliticianClick}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="mt-5 flex justify-center items-center gap-2 flex-wrap">
        {sortedGroups.map((group) => (
          <div key={group.id} className="flex items-center gap-1 border px-2 py-1 rounded-full text-xs">
            {group.id === "conservatives" && "🦅"}
            {group.id === "liberals" && "🌹"}
            {group.id === "greens" && "🌿"}
            {group.id === "moderates" && "⚖️"}
            {group.id === "radicals" && "✊"}
            <span>{group.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParliamentLayout;
