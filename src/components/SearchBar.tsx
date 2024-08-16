import { useEffect, useState } from "react";
import "./SearchBar.css";
import { autoCompleteFetchDatas } from "../utils/autocomplete";
import useSearchBarContext from "../context/useSearchBarContext";

interface SearchBoxPropTypes {
  autocompleteUrl: string;
}

export const SearchBar = ({ autocompleteUrl }: SearchBoxPropTypes) => {
  const {
    searchText,
    setSearchText,
    searchedData,
    setSearchedData,
    selectedWord,
    setSelectedWord,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
  } = useSearchBarContext();

  const searchedDataLimit = 6;

  const handleClear = () => {
    setSearchText("");
    setSearchedData([]);
    setSelectedWord(null);
  };

  const handleName = (name: string) => {
    const encodedName = encodeURIComponent(name);
    setSearchText(name);
    setSearchedData(null);
    setSelectedWord(encodedName);
  };

  const autoCompleteFetchData = async (textWord: string) => {
    if (latitude !== null && longitude !== null) {
      let datas = await autoCompleteFetchDatas({
        autocompleteUrl,
        textWord,
        latitude,
        longitude,
      });
      setSearchedData(datas);
    }
    if (latitude === null && longitude === null) {
      let datas = await autoCompleteFetchDatas({
        autocompleteUrl,
        textWord,
        latitude: 27.677106,
        longitude: 85.32239,
      });
      setSearchedData(datas);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      const defaultLatitude = 27.67703098171896;
      const defaultLongitude = 85.32182494461703;

      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setLatitude(defaultLatitude);
          setLongitude(defaultLongitude);
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="container">
      <div
        className={`search-bar ${
          searchedData && searchedData.length > 0 ? "has-data" : ""
        }`}
      >
        <img
          src="/assets/pin.png"
          alt="Pin icon"
          className="search-icon"
          height={20}
          width={20}
        />
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            autoCompleteFetchData(e.target.value);
            setSearchText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchedData && searchedData.length > 0) {
              handleName(searchedData[0].name);
            }
          }}
          autoComplete="off"
        />
        <div className="search-controls">
          <img
            src="/assets/search.png"
            alt="search icon"
            height={20}
            width={20}
          />
          <div className="vline"></div>
          <img
            src="/assets/close.png"
            alt="close icon"
            height={20}
            width={20}
            onClick={handleClear}
          />
        </div>
      </div>
      {searchedData && searchedData.length > 0 && (
        <div className="search-data">
          <ul>
            {searchedData.slice(0, searchedDataLimit).map((item: any) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    handleName(item.name);
                  }}
                >
                  <div className="flex ">
                    <img
                      src="/assets/pin.png"
                      alt="Pin icon"
                      height={20}
                      width={20}
                    />
                    <span>{item.name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
