import React from "react";

interface MultiSelectChipProps {
  label: string;
  isSelected: boolean;
  onSelect: (label: string) => void;
}

function MultiSelectChip({
  label,
  isSelected,
  onSelect,
}: MultiSelectChipProps) {
  const chipClass = isSelected ? "chip chip-selected" : "chip chip-unselected";

  return (
    <div className={chipClass} onClick={() => onSelect(label)}>
      {label}
    </div>
  );
}

export default MultiSelectChip;
