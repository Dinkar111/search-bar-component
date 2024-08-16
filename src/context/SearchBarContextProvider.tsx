import { createContext, useState } from "react";

interface SearchBarContextValues {
  searchText: string;
  searchedData: any;
  selectedWord: string | null;
  latitude: number | null;
  longitude: number | null;

  setSearchText: (e: string) => void;
  setSearchedData: (e: any) => void;
  setSelectedWord: (e: string | null) => void;
  setLatitude: (e: number | null) => void;
  setLongitude: (e: number | null) => void;
}

export const SearchBarContext = createContext<
  SearchBarContextValues | undefined
>(undefined);

interface SearchBarContextProviderProps {
  children: React.ReactNode;
}

const SearchBarContextProvider = ({
  children,
}: SearchBarContextProviderProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedData, setSearchedData] = useState<any>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  return (
    <SearchBarContext.Provider
      value={{
        searchText,
        setSearchText,
        selectedWord,
        setSelectedWord,
        searchedData,
        setSearchedData,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
      }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarContextProvider;
