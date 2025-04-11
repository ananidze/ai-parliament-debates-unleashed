
import React from "react";
import { Politician as PoliticianType, ParliamentaryGroup } from "../utils/parliamentUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Flag, Shield, User } from "lucide-react";
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

  // Get specialty icon
  const getSpecialtyIcon = () => {
    switch (politician.specialty.toLowerCase()) {
      case "economy": return <Building2 className="h-3 w-3" />;
      case "defense": return <Shield className="h-3 w-3" />;
      case "foreign affairs": return <Flag className="h-3 w-3" />;
      default: return <User className="h-3 w-3" />;
    }
  };

  return (
    <Card className="w-full mb-4 overflow-hidden border shadow-md">
      <CardHeader className={cn(
        "py-4", 
        getBgColor(), 
        getTextColor()
      )}>
        <div className="flex items-center gap-3">
          <Avatar className="border-2 border-white/50">
            <AvatarImage src={politician.avatar} alt={politician.name} />
            <AvatarFallback className={cn(
              getBgColor(),
              "text-lg font-semibold",
              getTextColor()
            )}>
              {politician.name.charAt(0)}
              {politician.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base md:text-lg">{politician.name}</CardTitle>
            <div className="text-xs md:text-sm opacity-90 flex items-center gap-1">
              <Flag className="h-3 w-3" />
              {group.name} • {group.orientation}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {politician.role && (
            <Badge 
              variant="outline" 
              className={cn(
                "font-semibold border-2",
                politician.role === "Group Leader" ? "border-primary" : ""
              )}
            >
              {politician.role}
            </Badge>
          )}
          <Badge variant="secondary" className="flex items-center gap-1">
            {getSpecialtyIcon()}
            {politician.specialty}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {politician.name} is a member of the {group.name} ({group.orientation}) and specializes in {politician.specialty.toLowerCase()} issues.
        </p>
      </CardContent>
    </Card>
  );
};

export default Politician;
