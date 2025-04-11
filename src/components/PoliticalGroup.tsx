
import React from "react";
import { ParliamentaryGroup, Politician } from "../utils/parliamentUtils";

interface PoliticalGroupProps {
  group: ParliamentaryGroup;
  politicians: Politician[];
  row: number;
  onPoliticianClick: (politician: Politician) => void;
}

const PoliticalGroup: React.FC<PoliticalGroupProps> = ({
  group,
  politicians,
  row,
  onPoliticianClick
}) => {
  // Calculate how many politicians to show based on the row
  // We'll show fewer politicians in the back rows for a curved chamber effect
  const maxPoliticians = 5 - row;
  const displayedPoliticians = politicians.slice(0, maxPoliticians);

  return (
    <div className={`flex justify-center items-center gap-2 my-1`}>
      {displayedPoliticians.map((politician) => (
        <div
          key={politician.id}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-${group.color} cursor-pointer flex items-center justify-center transform hover:scale-110 transition-transform 
                    ${politician.role === "Group Leader" ? "ring-2 ring-white" : ""}`}
          onClick={() => onPoliticianClick(politician)}
          title={politician.name}
        >
          <span className="text-white text-xs font-semibold">
            {politician.name.charAt(0)}
            {politician.name.split(" ")[1]?.charAt(0)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PoliticalGroup;
