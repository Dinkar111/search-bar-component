type autoCompleteParamsType = {
  autocompleteUrl: string;
  textWord: string;
  latitude: number;
  longitude: number;
};

const autoCompleteFetchDatas = async (params: autoCompleteParamsType) => {
  if (params.textWord.length > 2) {
    try {
      const url = `${params.autocompleteUrl}&word=${params.textWord}&lat=${params.latitude}&lng=${params.longitude}`;
      let response = await fetch(url);
      let result = await response.json();
      if (result.success) {
        return result.data;
      }
      return [];
    } catch (error) {
      console.error("error fetching datas", error);
    }
  }
  return [];
};

export { autoCompleteFetchDatas };
