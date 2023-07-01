import { useEffect, useState } from "react";

import { View } from "../../components/View";
import { CatsList } from "../../components/CatsList";
import { PetEditPanel } from "../../components/PetEditPanel";
import { usePetEditForm } from "../../hooks/usePetEditForm";
import { Return, useFetchApi } from "../../hooks/useFetchApi";

import { Cat, Age, Breed } from "@app/types";

export const HomeViewContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [cats, setCats] = useState<Cat[]>([]);
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const { response: catsRes, startFetch: startFetchCats } =
    useFetchApi<Return<Cat[]>>("/cats");

  const { response: agesRes, startFetch: startFetchAges } =
    useFetchApi<Return<Age[]>>("/ages");

  const { response: breedsRes, startFetch: startFetchBreeds } =
    useFetchApi<Return<Breed[]>>("/breeds");

  const { response: createCatRes, startFetch: createCat } = useFetchApi(
    "/cats",
    "POST"
  );

  const form = usePetEditForm({
    onSubmit: (values) => {
      createCat(
        JSON.stringify({
          name: values.name,
          breed: values.breed.name,
          age: values.age.name,
        })
      );
    },
  });

  const onOpen = () => {
    setIsOpen(true);
    form.resetForm();
  };

  const onClose = () => {
    setIsOpen(false);
    form.resetForm();
  };

  useEffect(() => {
    startFetchCats();
    startFetchAges();
    startFetchBreeds();
  }, []);

  useEffect(() => {
    if (catsRes?.data) {
      setCats(catsRes.data);
    }
  }, [catsRes]);

  useEffect(() => {
    if (agesRes?.data) {
      setAges(agesRes.data);
    }
  }, [agesRes]);

  useEffect(() => {
    if (breedsRes?.data) {
      setBreeds(breedsRes.data);
    }
  }, [breedsRes]);

  return (
    <>
      <View onOpenEditPetModal={onOpen}>
        <CatsList cats={cats} />
      </View>
      <PetEditPanel
        isOpen={isOpen}
        onClose={onClose}
        formProps={{ ...form, breeds, ages }}
      />
    </>
  );
};
