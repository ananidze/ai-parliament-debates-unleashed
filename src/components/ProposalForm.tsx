
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParliamentaryGroup } from "../utils/parliamentUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ProposalFormProps {
  groups: ParliamentaryGroup[];
  onSubmit: (proposal: {
    title: string;
    description: string;
    proposedBy: string;
    tags: string[];
  }) => void;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ groups, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposedBy, setProposedBy] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !proposedBy) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    onSubmit({
      title,
      description,
      proposedBy,
      tags: tags.length > 0 ? tags : ["general"]
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setProposedBy("");
    setTags([]);
    
    toast.success("New law proposal submitted successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit New Law Proposal</CardTitle>
        <CardDescription>
          Draft a new law to be debated in the parliament
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Law Title</Label>
            <Input
              id="title"
              placeholder="e.g. Renewable Energy Act"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and details of this proposed law..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proposedBy">Proposed By</Label>
            <Select
              value={proposedBy}
              onValueChange={setProposedBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a political group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="e.g. economy, health, education"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="flex-grow"
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(t)}
                  >
                    {t} &times;
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full">
            Submit Proposal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProposalForm;
