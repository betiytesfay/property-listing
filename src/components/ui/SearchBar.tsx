"use client";

import { useState, KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  MdApartment,
  MdDirectionsCar,
  MdAttachMoney
} from "react-icons/md";
import {
  FiHome,
  FiStar,
  FiKey
} from "react-icons/fi";
import { GiFarmer } from "react-icons/gi";

const SUGGESTIONS = [
  { label: "Apartments", value: "apartment", icon: <MdApartment size={18} className="text-gray-500 inline mr-2" /> },
  { label: "Houses", value: "house", icon: <FiHome size={18} className="text-gray-500 inline mr-2" /> },
  { label: " Land", value: "land", icon: <GiFarmer size={18} className="text-gray-500 inline mr-2" /> },
  { label: " Cars", value: "car", icon: <MdDirectionsCar size={18} className="text-gray-500 inline mr-2" /> },
  { label: "SUVs", value: "suv", icon: <MdDirectionsCar size={18} className="text-gray-500 inline mr-2" /> },
  { label: "Under $100k", value: "affordable", icon: <MdAttachMoney size={18} className="text-gray-500 inline mr-2" /> },
  { label: "Featured", value: "featured", icon: <FiStar size={18} className="text-yellow-500 inline mr-2" /> },
  { label: "For Rent", value: "rent", icon: <FiKey size={18} className="text-gray-500 inline mr-2" /> },
] as const;

interface SearchBarProps {
  onSearch?: (keywords: string[]) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addKeyword = (word: string) => {
    const cleanWord = word.trim().toLowerCase();
    if (cleanWord && !keywords.includes(cleanWord)) {
      setKeywords([...keywords, cleanWord]);
      setInputValue("");
    }
    setShowSuggestions(false);
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword(inputValue);
    }
  };

  const handleSearch = () => {
    if (keywords.length === 0) return;

    if (onSearch) {
      onSearch(keywords);
    } else {
      const query = keywords.join(",");
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full">
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(keyword)}
                className="hover:bg-amber-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {showSuggestions && (
        <div className="mb-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.value}
                onClick={() => addKeyword(suggestion.value)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm flex items-center"
              >
                {suggestion.icon}
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type or select from suggestions..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400"
        />
        <button
          onClick={handleSearch}
          disabled={keywords.length === 0}
          className="rounded-full h-12 w-12 bg-amber-500  text-white hover:bg-amber-600 disabled:opacity-50 flex items-center justify-center"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
}