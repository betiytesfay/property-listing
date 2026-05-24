"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { SearchBar } from "@/src/components/ui/SearchBar";

interface SearchResult {
  id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  image?: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const keywords = query.split(",").filter(k => k);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (keywords.length === 0) return;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError("API not ready");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search bar at top */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {/* Search query info */}
      {keywords.length > 0 && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Searching for: "{keywords.join(", ")}"
          </h1>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Waiting for API message (shown when API returns error) */}
      {error === "API not ready" && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg className="animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Search API is being prepared
          </h2>
          <p className="text-gray-500 mb-6">
            We're working on bringing you better search results.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition"
          >
            ← Go back and browse
          </Link>
        </div>
      )}

      {/* Other errors */}
      {error && error !== "API not ready" && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Results grid */}
      {!isLoading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div key={result.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg">{result.title}</h3>
              <p className="text-amber-600 font-bold mt-1">
                ${result.price.toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm mt-1">{result.location}</p>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {!isLoading && !error && results.length === 0 && keywords.length > 0 && (
        <div className="text-center py-12 text-gray-500">
          No results found for "{keywords.join(", ")}"
        </div>
      )}
    </div>
  );
}