// types/mapbox-search-box.d.ts
declare namespace JSX {
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