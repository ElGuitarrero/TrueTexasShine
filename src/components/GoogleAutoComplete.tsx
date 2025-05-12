"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSelect: (val: string) => void;
  apiKey: string;
}

interface Suggestion {
  text: string;
  place_prediction: { place_id: string };
}

interface GoogleSuggestResponse {
  suggestions: Suggestion[];
}

export default function GoogleAutocomplete({
  value,
  onChange,
  onSelect,
  apiKey,
}: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [ready, setReady] = useState(false);
  const autocompleteRef = useRef<unknown>(null);
  console.log(window.google.maps.places.AutocompleteSuggestion);

  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (window.google?.maps?.places?.AutocompleteSuggestion) {
        autocompleteRef.current = new window.google.maps.places.AutocompleteSuggestion();
        setReady(true);
      } else {
        console.warn("AutocompleteSuggestion is not available.");
      }
    });
  }, [apiKey]);

  useEffect(() => {
    if (!ready || value.length < 2 || !autocompleteRef.current) {
      setSuggestions([]);
      return;
    }

    const instance = autocompleteRef.current as {
      suggest: (options: {
        input: string;
        signal: AbortSignal;
      }) => Promise<GoogleSuggestResponse>;
    };

    const controller = new AbortController();

    instance
      .suggest({ input: value, signal: controller.signal })
      .then((response) => {
        const formatted: Suggestion[] = response.suggestions.map((s) => ({
          text: s.text,
          place_prediction: s.place_prediction,
        }));
        setSuggestions(formatted);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") console.error("Autocomplete error:", err);
      });

    return () => controller.abort();
  }, [value, ready]);

  const handleSelect = (val: Suggestion) => {
    onSelect(val.text);
    onChange(val.text);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your address"
        className="w-full border border-[#DCC5C5] p-2 rounded"
        disabled={!ready}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 rounded w-full z-50 shadow max-h-60 overflow-auto text-sm">
          {suggestions.map((s) => (
            <li
              key={s.place_prediction.place_id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(s)}
            >
              {s.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}