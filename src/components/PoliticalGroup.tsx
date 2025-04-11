
import React from "react";
import { ParliamentaryGroup, Politician } from "../utils/parliamentUtils";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
      case "conservatives": return "bg-parliament-conservative";
      case "liberals": return "bg-parliament-liberal";
      case "greens": return "bg-parliament-green";
      case "moderates": return "bg-parliament-moderate";
      case "radicals": return "bg-parliament-radical";
      default: return "bg-gray-500";
    }
  };

  const getTextColor = () => {
    // Darker backgrounds need white text
    return ["conservatives", "liberals", "radicals"].includes(group.id) 
      ? "text-white" 
      : "text-gray-900";
  };

  const getPartyIcon = () => {
    switch (group.id) {
      case "conservatives": return "🦅"; // Eagle - traditional conservative symbol
      case "liberals": return "🌹"; // Rose - common liberal/progressive symbol
      case "greens": return "🌿"; // Leaf - environmental symbol
      case "moderates": return "⚖️"; // Scales - balance/moderation
      case "radicals": return "✊"; // Fist - symbol of resistance/radical change
      default: return "🏛️"; // Default political symbol
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Group label - only show on the first row */}
      {row === 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1",
                getBgColor(),
                getTextColor()
              )}>
                <span>{getPartyIcon()}</span>
                <span className="hidden sm:inline">{group.name}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{group.description}</p>
              <p className="text-xs mt-1"><b>Orientation:</b> {group.orientation}</p>
              <p className="text-xs"><b>Seats:</b> {group.seatsCount}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Politicians */}
      <div className="flex justify-center items-center gap-1">
        {displayedPoliticians.map((politician) => (
          <TooltipProvider key={politician.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "w-6 h-6 md:w-7 md:h-7 rounded-full cursor-pointer flex items-center justify-center shadow-sm",
                    getBgColor(),
                    getTextColor()
                  )}
                  onClick={() => onPoliticianClick(politician)}
                >
                  <span className="text-xs font-medium">
                    {politician.name.charAt(0)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{politician.name}</p>
                <p className="text-xs">{politician.specialty}</p>
                {politician.role && <p className="text-xs italic">{politician.role}</p>}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default PoliticalGroup;
