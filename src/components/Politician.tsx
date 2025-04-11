
import React from "react";
import { Politician as PoliticianType, ParliamentaryGroup } from "../utils/parliamentUtils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PoliticianProps {
  politician: PoliticianType;
  group: ParliamentaryGroup;
}

const Politician: React.FC<PoliticianProps> = ({ politician, group }) => {
  // Get the appropriate background color based on political group
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

  // Get text color based on background darkness
  const getTextColor = () => {
    return ["conservative", "liberal", "radical"].includes(group.id) 
      ? "text-white" 
      : "text-gray-900";
  };

  return (
    <div className="flex flex-col items-center text-center">
      <Avatar className="h-16 w-16 mb-2">
        <AvatarFallback className={cn(
          getBgColor(),
          "text-lg font-semibold",
          getTextColor()
        )}>
          {politician.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <h3 className="font-medium text-base">{politician.name}</h3>
      <p className="text-sm text-muted-foreground">{group.name}</p>
      
      <div className="mt-2 text-sm">
        <p><span className="font-medium">Role:</span> {politician.role || "Member"}</p>
        <p><span className="font-medium">Specialty:</span> {politician.specialty}</p>
      </div>
    </div>
  );
};

export default Politician;
