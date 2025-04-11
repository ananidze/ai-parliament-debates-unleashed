
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
  
  // Get party symbol
  const getPartySymbol = () => {
    switch (proposingGroup?.id) {
      case "conservatives": return "🦅"; 
      case "liberals": return "🌹";
      case "greens": return "🌿";
      case "moderates": return "⚖️";
      case "radicals": return "✊";
      default: return "🏛️";
    }
  };

  // Get party color class
  const getPartyColorClass = () => {
    switch (proposingGroup?.id) {
      case "conservatives": return "border-l-parliament-conservative"; 
      case "liberals": return "border-l-parliament-liberal";
      case "greens": return "border-l-parliament-green";
      case "moderates": return "border-l-parliament-moderate";
      case "radicals": return "border-l-parliament-radical";
      default: return "border-l-gray-500";
    }
  };

  return (
    <Card className={`transition-all border-l-4 ${getPartyColorClass()} ${isActive ? 'border-2 border-l-4' : ''}`}>
      <CardHeader className="py-2 px-4">
        <div className="flex justify-between items-start gap-1">
          <div className="flex items-center gap-1">
            <span>{getPartySymbol()}</span>
            <CardTitle className="text-sm">{law.title}</CardTitle>
          </div>
          <Badge variant={statusBadgeVariant() as any} className="text-xs">{statusText()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <p className="text-xs text-muted-foreground mb-2">
          {law.description.length > 60 ? law.description.substring(0, 60) + '...' : law.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs">{proposingGroup?.name}</span>
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
