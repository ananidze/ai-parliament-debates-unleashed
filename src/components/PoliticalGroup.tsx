
import React from "react";
import { ParliamentaryGroup, Politician } from "../utils/parliamentUtils";
import { cn } from "@/lib/utils";

interface PoliticalGroupProps {
  group: ParliamentaryGroup;
  politicians: Politician[];
  row: number;
  onPoliticianClick: (politician: Politician) => void;
}

const PoliticalGroup: React.FC<PoliticalGroupProps> = ({
  group,
  politicians,
  row,
  onPoliticianClick
}) => {
  // Calculate how many politicians to show based on the row
  // We'll show fewer politicians in the back rows for a curved chamber effect
  const maxPoliticians = 4 - row;
  const displayedPoliticians = politicians.slice(0, maxPoliticians);

  // Map group colors to Tailwind classes
  const getBgColor = () => {
    switch (group.id) {
      case "conservative": return "bg-parliament-conservative";
      case "liberal": return "bg-parliament-liberal";
      case "green": return "bg-parliament-green";
      case "moderate": return "bg-parliament-moderate";
      case "radical": return "bg-parliament-radical";
      default: return "bg-gray-500";
    }
  };

  const getTextColor = () => {
    // Darker backgrounds need white text
    return ["conservative", "liberal", "radical"].includes(group.id) 
      ? "text-white" 
      : "text-gray-900";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Group label - only show on the first row */}
      {row === 0 && (
        <div className={cn(
          "text-xs font-medium px-1.5 py-0.5 rounded-full",
          getBgColor(),
          getTextColor()
        )}>
          {group.name}
        </div>
      )}
      
      {/* Politicians */}
      <div className="flex justify-center items-center gap-1">
        {displayedPoliticians.map((politician) => (
          <div
            key={politician.id}
            className={cn(
              "w-6 h-6 md:w-8 md:h-8 rounded-full cursor-pointer flex items-center justify-center shadow-sm",
              getBgColor(),
              getTextColor()
            )}
            onClick={() => onPoliticianClick(politician)}
            title={politician.name}
          >
            <span className="text-xs font-medium">
              {politician.name.charAt(0)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticalGroup;
