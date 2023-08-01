import { useEffect, useState } from "react";

import { View } from "../../components/View";
import { CatsList } from "../../components/CatsList";
import { PetEditPanel } from "../../components/PetEditPanel";
import { usePetEditForm, Values } from "../../hooks/usePetEditForm";
import { Return, useFetchApi } from "../../hooks/useFetchApi";
import { useToasterContext } from "../../contexts/Toaster";

import { Cat, Age, Breed } from "@app/types";

export const HomeViewContainer = () => {
  const { addToast } = useToasterContext();
  const [initialValues] = useState<Values>({
    id: "",
    name: "",
    breed: { id: 0, name: "" },
    age: { id: 0, name: "" },
    description: JSON.stringify([
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
    ]),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [cats, setCats] = useState<Cat[]>([]);
  const [ages, setAges] = useState<Age[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [id, setId] = useState<Cat["id"]>();

  const fetchCats = useFetchApi<Return<Cat[]>>("/cats");
  const fetchAges = useFetchApi<Return<Age[]>>("/ages");
  const fetchBreeds = useFetchApi<Return<Breed[]>>("/breeds");
  const createCat = useFetchApi<Return<Cat>>("/cats", "POST");
  const updateCat = useFetchApi<Return<Cat>>(`/cats/${id}`, "PATCH");

  const form = usePetEditForm({
    initialValues,
    onSubmit: (values) => {
      if (values.id) {
        updateCat.startFetch(
          JSON.stringify({
            name: values.name,
            breed: values.breed,
            age: values.age,
            description: values.description,
          })
        );
        return;
      }

      createCat.startFetch(
        JSON.stringify({
          name: values.name,
          breed: values.breed,
          age: values.age,
          description: values.description,
        })
      );
    },
  });

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onEditCat = (cat: Cat) => {
    setIsOpen(true);
    setId(cat.id);
    form.resetForm({
      values: cat,
    });
  };

  useEffect(() => {
    fetchCats.startFetch();
    fetchAges.startFetch();
    fetchBreeds.startFetch();
  }, []);

  useEffect(() => {
    if (fetchCats.response?.data) {
      setCats(fetchCats.response.data);
    }
  }, [fetchCats.response]);

  useEffect(() => {
    if (fetchAges.response?.data) {
      setAges(fetchAges.response.data);
    }
  }, [fetchAges.response]);

  useEffect(() => {
    if (fetchBreeds.response?.data) {
      setBreeds(fetchBreeds.response.data);
    }
  }, [fetchBreeds.response]);

  useEffect(() => {
    if (!isOpen || createCat.isFetching || updateCat.isFetching) {
      form.resetForm({
        values: initialValues,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, createCat.isFetching, updateCat.isFetching]);

  return (
    <>
      <View onOpenEditPetModal={onOpen}>
        <button
          onClick={() => {
            addToast({ type: "info", text: "Notification text" });
            addToast({ type: "warning", text: "Notification text" });
            addToast({ type: "error", text: "Notification text" });
            addToast({ type: "success", text: "Notification text" });
          }}
        >
          Add toast
        </button>
        <CatsList cats={cats} onEdit={onEditCat} />
      </View>
      <PetEditPanel
        isOpen={isOpen}
        onClose={onClose}
        formProps={{ ...form, breeds, ages }}
      />
    </>
  );
};
