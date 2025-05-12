// frontend/types/jsx.d.ts
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "mapbox-search-box": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "access-token": string;
        placeholder?: string;
        value?: string;
        class?: string;
      };
    }
  }
}
