
import React from "react";
import { Politician as PoliticianType, ParliamentaryGroup } from "../utils/parliamentUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PoliticianProps {
  politician: PoliticianType;
  group: ParliamentaryGroup;
}

const Politician: React.FC<PoliticianProps> = ({ politician, group }) => {
  // Get the appropriate background color based on political group
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

  // Get text color based on background darkness
  const getTextColor = () => {
    return ["conservatives", "liberals", "radicals"].includes(group.id) 
      ? "text-white" 
      : "text-gray-900";
  };

  // Get party symbol
  const getPartySymbol = () => {
    switch (group.id) {
      case "conservatives": return "🦅"; 
      case "liberals": return "🌹";
      case "greens": return "🌿";
      case "moderates": return "⚖️";
      case "radicals": return "✊";
      default: return "🏛️";
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex items-center gap-2">
        <Avatar className="h-20 w-20">
          <AvatarFallback className={cn(
            getBgColor(),
            "text-xl font-semibold",
            getTextColor()
          )}>
            {politician.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className={cn(
          "flex flex-col items-start",
          "ml-2"
        )}>
          <h3 className="font-medium text-lg">{politician.name}</h3>
          <div className="flex items-center mt-1">
            <span className="mr-2">{getPartySymbol()}</span>
            <span className="text-sm text-muted-foreground">{group.name}</span>
          </div>
          {politician.role && (
            <Badge variant="outline" className="mt-1">{politician.role}</Badge>
          )}
        </div>
      </div>
      
      <div className="w-full px-4 py-3 bg-muted rounded-md">
        <div className="mb-2">
          <h4 className="font-semibold text-sm">Party Values</h4>
          <p className="text-xs text-muted-foreground">{group.description}</p>
        </div>
        
        <div className="mb-2">
          <h4 className="font-semibold text-sm">Political Orientation</h4>
          <p className="text-xs text-muted-foreground">{group.orientation}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm">Specialty</h4>
          <p className="text-xs text-muted-foreground">{politician.specialty}</p>
        </div>
      </div>
    </div>
  );
};

export default Politician;
