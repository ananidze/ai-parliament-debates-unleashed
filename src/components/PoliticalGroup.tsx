
import React from "react";
import { ParliamentaryGroup, Politician } from "../utils/parliamentUtils";
import { BadgeCheck, Flag } from "lucide-react";
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
  const maxPoliticians = 5 - row;
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
    <div className="flex flex-col items-center gap-2 my-1">
      {/* Group label */}
      <div className={cn(
        "text-xs font-semibold mb-1 px-2 py-0.5 rounded-full",
        getBgColor(),
        getTextColor()
      )}>
        {row === 0 && (
          <span className="flex items-center gap-1">
            <Flag className="w-3 h-3" />
            {group.name}
          </span>
        )}
      </div>
      
      {/* Politicians */}
      <div className="flex justify-center items-center gap-2">
        {displayedPoliticians.map((politician) => (
          <div
            key={politician.id}
            className={cn(
              "w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer flex items-center justify-center transform hover:scale-110 transition-transform shadow-md",
              getBgColor(),
              getTextColor(),
              "relative"
            )}
            onClick={() => onPoliticianClick(politician)}
            title={politician.name}
          >
            <span className="text-xs font-semibold">
              {politician.name.charAt(0)}
              {politician.name.split(" ")[1]?.charAt(0)}
            </span>
            
            {/* Badge for group leaders */}
            {politician.role === "Group Leader" && (
              <span className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <BadgeCheck className="w-3 h-3 text-primary" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticalGroup;
