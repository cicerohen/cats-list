import { useEffect } from "react";

import { View } from "../components/view";
import { CatsList } from "../components/cats-list";
import { CatCard } from "../components/cat-card";

import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useCatsContext } from "../contexts/cats-provider";

export const HomePage = () => {
  const { authentication } = useAuthenticationContext();
  const { cats, loading, fetchCats } = useCatsContext();

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <View>
      <CatsList
        cats={cats}
        loading={loading}
        renderCat={(cat) => (
          <CatCard
            {...cat}
            editable={cat.owner_email === authentication.Username}
          />
        )}
      />
    </View>
  );
};
