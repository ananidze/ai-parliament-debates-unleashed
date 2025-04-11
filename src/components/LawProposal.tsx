
import React from "react";
import { LawProposal as LawProposalType, ParliamentaryGroup } from "../utils/parliamentUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface LawProposalProps {
  law: LawProposalType;
  groups: ParliamentaryGroup[];
  onSelectLaw: (law: LawProposalType) => void;
  isActive: boolean;
}

const LawProposal: React.FC<LawProposalProps> = ({
  law,
  groups,
  onSelectLaw,
  isActive
}) => {
  const proposingGroup = groups.find(group => group.id === law.proposedBy);
  
  const statusBadgeVariant = () => {
    switch (law.status) {
      case "passed": return "success";
      case "rejected": return "destructive";
      case "debating": return "default";
      default: return "secondary";
    }
  };

  const statusText = () => {
    switch (law.status) {
      case "passed": return "Passed";
      case "rejected": return "Rejected";
      case "debating": return "In Debate";
      default: return "Pending";
    }
  };

  return (
    <Card className={`transition-all ${isActive ? 'border-primary border-2' : ''}`}>
      <CardHeader className="py-2 px-4">
        <div className="flex justify-between items-start gap-1">
          <CardTitle className="text-sm">{law.title}</CardTitle>
          <Badge variant={statusBadgeVariant() as any} className="text-xs">{statusText()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <p className="text-xs text-muted-foreground mb-2">
          {law.description.length > 60 ? law.description.substring(0, 60) + '...' : law.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs">By: {proposingGroup?.name}</span>
          <Button 
            onClick={() => onSelectLaw(law)} 
            variant={isActive ? "default" : "outline"}
            size="sm"
            className="text-xs h-7"
          >
            {isActive ? "Active" : "Debate"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawProposal;
