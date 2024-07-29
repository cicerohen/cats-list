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
    <View.Root>
      <View.Header />
      <View.Body>
        <CatsList.Root>
          <CatsList.Body>
            {loading && (
              <>
                {Array.from(new Array(8)).map((_, i) => (
                  <CatCard.Skeleton key={i} />
                ))}
              </>
            )}
            {!loading && cats.length === 0 && <CatsList.Empty />}
            {cats.length > 0 && (
              <>
                {cats.map((cat) => {
                  return (
                    <CatCard.Root key={cat.id}>
                      <CatCard.Header>
                        <CatCard.Photo url={cat.photo.url} />
                        <CatCard.Title>{cat.name}</CatCard.Title>
                        <CatCard.Breed>{cat.breed.name}</CatCard.Breed>
                        <CatCard.Age>{cat.age.name}</CatCard.Age>
                        <CatCard.Description description={cat.description} />
                      </CatCard.Header>
                      {cat.owner_email === authentication.Username && (
                        <CatCard.Footer>
                          <CatCard.Edit catId={cat.id} />
                        </CatCard.Footer>
                      )}
                    </CatCard.Root>
                  );
                })}
              </>
            )}
          </CatsList.Body>
        </CatsList.Root>
      </View.Body>
    </View.Root>
  );
};
