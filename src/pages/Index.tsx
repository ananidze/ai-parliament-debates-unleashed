
import React, { useState, useEffect } from "react";
import { 
  politicalGroups, 
  politicians, 
  lawProposals as initialLawProposals,
  initialDebateStatements
} from "../data/parliamentData";
import { 
  LawProposal as LawProposalType,
  DebateStatement,
  Politician as PoliticianType,
  ParliamentaryGroup
} from "../utils/parliamentUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

import ParliamentLayout from "../components/ParliamentLayout";
import LawProposal from "../components/LawProposal";
import DebatePanel from "../components/DebatePanel";
import Politician from "../components/Politician";
import ProposalForm from "../components/ProposalForm";

const Index = () => {
  // State management
  const [activeLaw, setActiveLaw] = useState<LawProposalType | null>(null);
  const [lawProposals, setLawProposals] = useState<LawProposalType[]>(initialLawProposals);
  const [debateStatements, setDebateStatements] = useState<DebateStatement[]>(initialDebateStatements);
  const [selectedPolitician, setSelectedPolitician] = useState<PoliticianType | null>(null);
  const [selectedPoliticianGroup, setSelectedPoliticianGroup] = useState<ParliamentaryGroup | null>(null);

  // Set initial active law
  useEffect(() => {
    const debatingLaw = lawProposals.find(law => law.status === "debating");
    if (debatingLaw) {
      setActiveLaw(debatingLaw);
    }
  }, []);

  // Handle selecting a law for debate
  const handleSelectLaw = (law: LawProposalType) => {
    // Update previous active law status
    if (activeLaw && activeLaw.id !== law.id) {
      setLawProposals(prevLaws => 
        prevLaws.map(l => 
          l.id === activeLaw.id ? { ...l, status: "pending" } : l
        )
      );
    }
    
    // Set new active law
    setActiveLaw(law);
    
    // Update law status
    setLawProposals(prevLaws => 
      prevLaws.map(l => 
        l.id === law.id ? { ...l, status: "debating" } : l
      )
    );
    
    toast(`Now debating: ${law.title}`);
  };

  // Handle politician selection
  const handlePoliticianClick = (politician: PoliticianType) => {
    setSelectedPolitician(politician);
    const group = politicalGroups.find(g => g.id === politician.groupId);
    if (group) {
      setSelectedPoliticianGroup(group);
    }
  };

  // Handle adding a new debate statement
  const handleAddStatement = (statement: DebateStatement) => {
    setDebateStatements(prev => [...prev, statement]);
  };

  // Handle voting on a law
  const handleVote = (lawId: string, voteType: "for" | "against" | "abstain") => {
    setLawProposals(prevLaws =>
      prevLaws.map(law => {
        if (law.id === lawId) {
          const updatedVotes = { ...law.votes };
          updatedVotes[voteType] += 1;
          
          // Determine if the law passes or fails after voting
          const totalVotes = updatedVotes.for + updatedVotes.against;
          let status: LawProposalType["status"] = law.status;
          
          if (totalVotes >= 50) { // Arbitrary number for demonstration
            status = updatedVotes.for > updatedVotes.against ? "passed" : "rejected";
          }
          
          return { ...law, votes: updatedVotes, status };
        }
        return law;
      })
    );
    
    toast.success(`You voted ${voteType} on "${activeLaw?.title}"`);
  };

  // Handle submitting a new proposal
  const handleSubmitProposal = (proposal: {
    title: string;
    description: string;
    proposedBy: string;
    tags: string[];
  }) => {
    const newLaw: LawProposalType = {
      id: `law${lawProposals.length + 1}`,
      title: proposal.title,
      description: proposal.description,
      proposedBy: proposal.proposedBy,
      status: "pending",
      votes: {
        for: 0,
        against: 0,
        abstain: 0
      },
      tags: proposal.tags
    };
    
    setLawProposals(prev => [...prev, newLaw]);
    toast.success("New law proposal submitted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white py-3 px-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-center">AI Parliament</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-3 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <ParliamentLayout 
            groups={politicalGroups}
            politicians={politicians}
            onPoliticianClick={handlePoliticianClick}
          />
        </div>
        
        <Tabs defaultValue="debate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-3">
            <TabsTrigger value="debate">Debates</TabsTrigger>
            <TabsTrigger value="propose">Propose</TabsTrigger>
          </TabsList>
          
          <TabsContent value="debate" className="mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-1">
                <h2 className="text-lg font-medium mb-2">Law Proposals</h2>
                <div className="space-y-2">
                  {lawProposals.map(law => (
                    <LawProposal
                      key={law.id}
                      law={law}
                      groups={politicalGroups}
                      onSelectLaw={handleSelectLaw}
                      isActive={activeLaw?.id === law.id}
                    />
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2">
                {activeLaw ? (
                  <DebatePanel
                    activeLaw={activeLaw}
                    statements={debateStatements.filter(s => s.lawId === activeLaw.id)}
                    politicians={politicians}
                    groups={politicalGroups}
                    onAddStatement={handleAddStatement}
                    onVote={handleVote}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center border rounded-lg bg-white p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium mb-2">No Active Debate</h3>
                      <p className="text-muted-foreground text-sm">
                        Select a law proposal to start a debate.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="propose" className="mt-3">
            <div className="max-w-2xl mx-auto">
              <ProposalForm
                groups={politicalGroups}
                onSubmit={handleSubmitProposal}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Politician details dialog */}
      <Dialog 
        open={!!selectedPolitician} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolitician(null);
            setSelectedPoliticianGroup(null);
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Politician Profile</DialogTitle>
          </DialogHeader>
          {selectedPolitician && selectedPoliticianGroup && (
            <Politician 
              politician={selectedPolitician} 
              group={selectedPoliticianGroup} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
