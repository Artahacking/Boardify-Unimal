"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Plus, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FormSelectProps {
  id: string;
  label: string;
  errors?: Record<string, string[] | undefined>;
  options: string[];
  setOptions: (opts: string[]) => void;
}

export const FormSelect = ({ id, label, errors, options, setOptions }: FormSelectProps) => {
  const [selected, setSelected] = useState<string | undefined>();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory && !options.includes(newCategory)) {
      setOptions([...options, newCategory]);
      setNewCategory("");
    }
  };

  const handleDelete = (opt: string) => {
    setOptions(options.filter(o => o !== opt));
    if (selected === opt) setSelected(undefined);
  };

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="text-sm font-semibold text-gray-800">
        {label}
      </label>

      <Select.Root value={selected} onValueChange={setSelected} name={id}>
        <Select.Trigger
          className={cn(
            "flex items-center justify-between w-full border rounded-lg px-4 py-2 text-sm bg-white shadow-sm transition hover:shadow-md focus:outline-none",
            errors?.[id] ? "border-red-500" : "border-gray-300"
          )}
        >
          <Select.Value placeholder="Pilih kategori" />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-white border rounded-lg shadow-lg z-50 w-[var(--radix-select-trigger-width)]">
            <Select.Viewport className="p-2 space-y-1">
              {options.map((option) => (
                <div key={option} className="group flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition">
                  <Select.Item
                    value={option}
                    className="flex-1 cursor-pointer text-sm focus:outline-none"
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="w-4 h-4 text-green-500" />
                    </Select.ItemIndicator>
                  </Select.Item>

                  <button
                    type="button"
                    onClick={() => handleDelete(option)}
                    className="text-rose-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {/* Add category form */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Tambah kategori baru"
        />
        <button
          type="button"
          onClick={handleAddCategory}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {errors?.[id] && (
        <p className="text-xs text-red-500">{errors[id]?.[0]}</p>
      )}
    </div>
  );
};
