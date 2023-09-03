import { CatCard } from "../../../components/cat-card";
import { fetchApi } from "../../../services/fetch-api";
import { useToasterContext } from "../../../components/toaster/toaster-context";

import { usePetFormContext } from "../contexts/pet-form-context";

import { Cat } from "@app/types";
import { useState } from "react";

type Props = {
  cat: Cat;
  fetchCats: () => void;
  setPanelTitle: React.Dispatch<React.SetStateAction<string>>;
  setPanelIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CatCardContainer = ({
  cat,
  fetchCats,
  setPanelIsOpen,
  setPanelTitle,
}: Props) => {
  const [removing, setRemoving] = useState<boolean>(false);
  const toaster = useToasterContext();
  const { form, initialValues } = usePetFormContext();

  const onEdit = () => {
    setPanelIsOpen(true);
    setPanelTitle("Edit cat");
    form.resetForm({
      values: cat,
    });
  };

  const onRemove = () => {
    setRemoving(true);
    fetchApi<Cat>(`/cats/${cat.id}`, "DELETE")
      .then(() => {
        toaster.addToast({
          type: "success",
          text: "Cat successfuly removed",
        });
        form.resetForm({
          values: initialValues,
        });
        fetchCats();
      })
      .catch((error) => {
        toaster.addToast({
          type: "error",
          text: error.message,
        });
      })
      .finally(() => {
        setRemoving(false);
      });
  };

  return (
    <CatCard {...cat} onEdit={onEdit} onRemove={onRemove} removing={removing} />
  );
};
