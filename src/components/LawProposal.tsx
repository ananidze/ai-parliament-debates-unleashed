
import React from "react";
import { LawProposal as LawProposalType, ParliamentaryGroup } from "../utils/parliamentUtils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className={`mb-4 transition-all ${isActive ? 'border-primary border-2' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{law.title}</CardTitle>
          <Badge variant={statusBadgeVariant() as any}>{statusText()}</Badge>
        </div>
        <CardDescription>
          Proposed by <span className={`font-medium text-${proposingGroup?.color}`}>{proposingGroup?.name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{law.description}</p>
        <div className="flex flex-wrap gap-1">
          {law.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => onSelectLaw(law)} 
          variant={isActive ? "default" : "outline"}
          className="w-full"
        >
          {isActive ? "Currently Debating" : "Open Debate"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LawProposal;
