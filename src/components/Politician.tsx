
import React from "react";
import { Politician as PoliticianType, ParliamentaryGroup } from "../utils/parliamentUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PoliticianProps {
  politician: PoliticianType;
  group: ParliamentaryGroup;
}

const Politician: React.FC<PoliticianProps> = ({ politician, group }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader className={`bg-${group.color} text-white`}>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={politician.avatar} alt={politician.name} />
            <AvatarFallback className={`bg-${group.color}`}>
              {politician.name.charAt(0)}
              {politician.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base md:text-lg">{politician.name}</CardTitle>
            <div className="text-xs md:text-sm opacity-90">{group.name}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {politician.role && (
            <Badge variant="outline" className="font-semibold">
              {politician.role}
            </Badge>
          )}
          <Badge variant="secondary">{politician.specialty}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {politician.name} is a member of the {group.name} and specializes in {politician.specialty.toLowerCase()} issues.
        </p>
      </CardContent>
    </Card>
  );
};

export default Politician;
