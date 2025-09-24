import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
  title: string;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryName: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={!selectedCategory ? 'default' : 'outline'}
        onClick={() => onCategorySelect("")}
        className={!selectedCategory ? 'bg-primary' : 'border-white/20 text-white hover:bg-white/10'}
      >
        Барлығы
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.name ? 'default' : 'outline'}
          onClick={() => onCategorySelect(category.name)}
          className={selectedCategory === category.name ? `${category.color}` : 'border-white/20 text-white hover:bg-white/10'}
        >
          {category.title}
        </Button>
      ))}
    </div>
  );
}
