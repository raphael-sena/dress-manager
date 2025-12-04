import * as React from "react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onValueChange,
  defaultValue = [],
  placeholder = "Selecione opções",
}) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-auto">
          {selectedValues.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {selectedValues.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return (
                  <Badge key={value} variant="secondary">
                    {option?.label}
                    <XIcon
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(value);
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
          <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleOption(option.value)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
