import { createContext, useContext, useState } from "react";
import { useFetchApi } from "../hooks/use-fetch-api";
import { Cat } from "@app/types";

type CatsContext = {
  cats: Cat[];
  loading: boolean;
  fetchCats: () => void;
};

const CatsContext = createContext({} as CatsContext);

type Props = {
  children: React.ReactElement;
};

export const CatsProvider = ({ children }: Props) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchApi = useFetchApi();

  const fetchCats = () => {
    setLoading(true);
    fetchApi<Cat[]>("/cats")
      .then((data) => {
        setCats(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value = {
    cats,
    loading,
    fetchCats,
  };

  return <CatsContext.Provider value={value}>{children}</CatsContext.Provider>;
};

export const useCatsContext = () => useContext(CatsContext);
