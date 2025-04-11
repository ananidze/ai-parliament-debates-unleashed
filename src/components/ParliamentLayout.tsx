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
  // Sort groups by number of seats (larger groups in the middle)
  const sortedGroups = [...groups].sort((a, b) => {
    // If they're from opposite ends of the spectrum, keep their positions
    if (
      (a.orientation.includes("Left") && b.orientation.includes("Right")) ||
      (a.orientation.includes("Right") && b.orientation.includes("Left"))
    ) {
      return a.orientation.includes("Left") ? -1 : 1;
    }
    // Otherwise sort by seats count
    return b.seatsCount - a.seatsCount;
  });

  // Create rows for the semicircle layout
  const rows = 3; // Number of semicircular rows
  
  return (
    <div className="w-full mb-6">
      <div className="relative parliament-chamber">
        {/* Speaker's podium */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-parliament-podium rounded-t-lg z-10" />
        
        {/* Parliament rows (semicircles) */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`flex justify-center items-center gap-4 mb-4`}
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
      
      <div className="mt-10 flex justify-center items-center gap-8">
        {sortedGroups.map((group) => (
          <div key={group.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-${group.color}`}></div>
            <span className="text-xs md:text-sm">{group.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParliamentLayout;
