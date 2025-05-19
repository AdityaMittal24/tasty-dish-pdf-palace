
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';

interface RecipeFiltersProps {
  onFilterChange: (value: boolean | null) => void;
  currentFilter: boolean | null;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({ onFilterChange, currentFilter }) => {
  const handleValueChange = (value: string) => {
    if (value === 'all') {
      onFilterChange(null);
    } else if (value === 'vegetarian') {
      onFilterChange(true);
    } else if (value === 'non-vegetarian') {
      onFilterChange(false);
    }
  };

  // Convert the boolean filter state to a string value for the toggle group
  const filterValue = currentFilter === null 
    ? 'all' 
    : currentFilter 
      ? 'vegetarian' 
      : 'non-vegetarian';

  return (
    <div className="mb-6">
      <Label className="mb-2 block">Filter recipes:</Label>
      <ToggleGroup
        type="single"
        value={filterValue}
        onValueChange={handleValueChange}
        className="justify-start"
      >
        <ToggleGroupItem value="all" className="px-4">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="vegetarian" className="px-4">
          Vegetarian
        </ToggleGroupItem>
        <ToggleGroupItem value="non-vegetarian" className="px-4">
          Non-Vegetarian
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default RecipeFilters;
