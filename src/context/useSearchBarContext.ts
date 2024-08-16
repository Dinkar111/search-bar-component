import { useContext } from "react";
import { SearchBarContext } from "./SearchBarContextProvider";

const useSearchBarContext = () => {
  const searchBarInstance = useContext(SearchBarContext);
  if (!searchBarInstance) {
    throw new Error("SearchBarContext is not provided!");
  }

  const searchText = searchBarInstance.searchText;
  const setSearchText = searchBarInstance.setSearchText;
  const searchedData = searchBarInstance.searchedData;
  const setSearchedData = searchBarInstance.setSearchedData;
  const selectedWord = searchBarInstance.selectedWord;
  const setSelectedWord = searchBarInstance.setSelectedWord;
  const latitude = searchBarInstance.latitude;
  const setLatitude = searchBarInstance.setLatitude;
  const longitude = searchBarInstance.longitude;
  const setLongitude = searchBarInstance.setLongitude;

  return {
    searchText,
    setSearchText,
    searchedData,
    setSearchedData,
    selectedWord,
    setSelectedWord,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };
};

export default useSearchBarContext;
