import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type CustomSelectType = {
  list: string[] | number[];
  filter: string;
  setFilters: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
};

export function CustomSelect({
  list,
  filter,
  setFilters,
  placeholder,
}: CustomSelectType) {
  return (
    <Select value={filter} onValueChange={setFilters}>
      <SelectTrigger className="w-45">
        <SelectValue
          className="placeholder:text-black"
          placeholder={placeholder}
        />
      </SelectTrigger>
      <SelectContent>
        {list.map((item, idx) => {
          return (
            <SelectItem key={idx} value={String(item)}>
              {item}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
