
import React, { useState, useEffect } from "react";
import { 
  DebateStatement, 
  LawProposal, 
  Politician, 
  ParliamentaryGroup,
  generatePoliticalResponse,
  getPoliticianById,
  getGroupById,
  generateStatementId
} from "../utils/parliamentUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Vote } from "lucide-react";

interface DebatePanelProps {
  activeLaw: LawProposal;
  statements: DebateStatement[];
  politicians: Politician[];
  groups: ParliamentaryGroup[];
  onAddStatement: (statement: DebateStatement) => void;
  onVote: (lawId: string, vote: "for" | "against" | "abstain") => void;
}

const DebatePanel: React.FC<DebatePanelProps> = ({
  activeLaw,
  statements,
  politicians,
  groups,
  onAddStatement,
  onVote
}) => {
  const [isGeneratingDebate, setIsGeneratingDebate] = useState(false);

  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Generate a new debate response
  const generateNewStatement = () => {
    setIsGeneratingDebate(true);
    
    // Randomly select a politician who hasn't spoken recently
    const recentSpeakers = statements.slice(-3).map(s => s.politicianId);
    const availablePoliticians = politicians.filter(p => !recentSpeakers.includes(p.id));
    const randomPolitician = availablePoliticians[Math.floor(Math.random() * availablePoliticians.length)];
    
    if (!randomPolitician) return;
    
    const group = getGroupById(randomPolitician.groupId, groups);
    if (!group) return;
    
    // Generate response based on political orientation
    const response = generatePoliticalResponse(randomPolitician, group, activeLaw.title);
    
    // Create new statement
    const newStatement: DebateStatement = {
      id: generateStatementId(),
      politicianId: randomPolitician.id,
      lawId: activeLaw.id,
      content: response,
      timestamp: new Date().getTime()
    };
    
    // Add a short delay to simulate AI thinking
    setTimeout(() => {
      onAddStatement(newStatement);
      setIsGeneratingDebate(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white">
      <div className="p-4 border-b bg-muted/30">
        <h2 className="text-lg font-semibold">{activeLaw.title} - Debate</h2>
        <p className="text-sm text-muted-foreground">{activeLaw.description}</p>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        {statements.map((statement) => {
          const politician = getPoliticianById(statement.politicianId, politicians);
          const group = politician ? getGroupById(politician.groupId, groups) : undefined;
          
          if (!politician || !group) return null;
          
          return (
            <div key={statement.id} className="mb-4 animate-fade-in">
              <div className="flex items-start gap-3">
                <Avatar className={`bg-${group.color}`}>
                  <AvatarImage src={politician.avatar} alt={politician.name} />
                  <AvatarFallback className={`bg-${group.color} text-white`}>
                    {politician.name.charAt(0)}
                    {politician.name.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-sm">{politician.name}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(statement.timestamp)}</span>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg speech-bubble animate-speech-bubble">
                    {statement.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button 
            onClick={generateNewStatement} 
            disabled={isGeneratingDebate}
            className="gap-2"
          >
            <MessageSquare size={16} />
            Generate Response
          </Button>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => onVote(activeLaw.id, "for")}
            >
              For ({activeLaw.votes.for})
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => onVote(activeLaw.id, "against")}
            >
              Against ({activeLaw.votes.against})
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-400 text-gray-600 hover:bg-gray-50"
              onClick={() => onVote(activeLaw.id, "abstain")}
            >
              Abstain ({activeLaw.votes.abstain})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebatePanel;
