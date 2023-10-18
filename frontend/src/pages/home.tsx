import { useEffect, useState } from "react";

import { View } from "../components/view";
import { CatList } from "../components/cat-list";
import { Header } from "../components/header";

import { Cat } from "@app/types";

import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useFetchApi } from "../hooks/use-fetch-api";

export const HomePage = () => {
  const fetchApi = useFetchApi();
  const { authentication } = useAuthenticationContext();

  const fetchCats = () => {
    fetchApi<Cat[]>("/cats").then((data) => {
      setCats(data.data);
    });
  };

  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <>
      <View header={<Header userAttributes={authentication.UserAttributes} />}>
        <CatList cats={cats} />
      </View>
    </>
  );
};
