"use client";

import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
// import usePlacesAutocomplete from "use-places-autocomplete";

const libraries: ("places")[] = ["places"];

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSelect: (val: string) => void;
  apiKey: string;
}

export default function GooglePlacesInput({
  value,
  onChange,
  onSelect,
  apiKey,
}: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [ready, setReady] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<
    { description: string; place_id: string }[]
  >([]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google) return;

    const { AutocompleteService } = window.google.maps.places;
    const service = new AutocompleteService();
    setReady(true);

    if (inputValue.length > 2) {
      service.getPlacePredictions({ input: inputValue }, (predictions) => {
        if (predictions) {
          setSuggestions(
            predictions.map((p) => ({
              description: p.description,
              place_id: p.place_id,
            }))
          );
        }
      });
    } else {
      setSuggestions([]);
    }
  }, [inputValue, isLoaded]);

  const handleSelect = (description: string) => {
    setInputValue(description);
    onSelect(description);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        value={inputValue}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          onChange(val);
        }}
        disabled={!ready}
        placeholder="Search your address"
        className="w-full border border-[#DCC5C5] p-2 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-50 rounded shadow max-h-60 overflow-auto">
          {suggestions.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}