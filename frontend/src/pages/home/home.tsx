import { useEffect, useState, useMemo } from "react";
import { View } from "../../components/view";

import { CatList } from "../../components/cat-list";
import { Panel } from "../../components/panel";
import { Header } from "../../components/header";

import { useToasterContext } from "../../components/toaster/toaster-context";
import { usePetForm } from "../../components/pet-form/use-pet-form";

import { fetchApi } from "../../services/fetch-api";

import { Cat } from "@app/types";

import { CatCardContainer } from "./containers/cat-card-container";
import { PetFormContainer } from "./containers/pet-form-container";

import { PetFormProvider } from "./contexts/pet-form-context";

export const HomePage = () => {
  const { addToast } = useToasterContext();
  const [panelTitle, setPanelTitle] = useState("");
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [isLoadingCats, setIsLoadingCats] = useState<boolean>(false);
  const initialValues = useMemo<Cat>(
    () => ({
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
      photo: {
        key: "",
        url: "",
      },
    }),
    [],
  );

  const fetchCats = () => {
    setIsLoadingCats(true);
    fetchApi<Cat[]>("/cats")
      .then((data) => {
        setCats(data.data);
      })
      .finally(() => {
        setIsLoadingCats(false);
      });
  };

  const form = usePetForm({
    initialValues,
    onSubmit: (values, helpers) => {
      if (values.id) {
        fetchApi(`/cats/${values.id}`, "PATCH", JSON.stringify(values))
          .then(() => {
            addToast({
              type: "success",
              text: "Cat was updated",
            });
          })
          .catch((error) => {
            addToast({
              type: "error",
              text: error.message,
            });
          })
          .finally(() => {
            helpers.setSubmitting(false);
            helpers.resetForm();
            setPanelIsOpen(false);
            fetchCats();
          });

        return;
      }

      fetchApi("/cats", "POST", JSON.stringify(values))
        .then(() => {
          addToast({
            type: "success",
            text: "Cat was added",
          });
        })
        .catch((error) => {
          addToast({
            type: "error",
            text: error.message,
          });
        })
        .finally(() => {
          form.resetForm({
            values: initialValues,
          });
          setPanelTitle("");
          setPanelIsOpen(false);
          helpers.setSubmitting(false);
          fetchCats();
        });
    },
  });
  const [cats, setCats] = useState<Cat[]>([]);

  const onOpenPetPanel = () => {
    setPanelTitle("Add a new cat");
    setPanelIsOpen(true);
  };

  const onClose = () => {
    setPanelIsOpen(false);
    form.resetForm({
      values: initialValues,
    });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <PetFormProvider form={form} initialValues={initialValues}>
      <View header={<Header onOpenPetPanel={onOpenPetPanel} />}>
        <CatList
          showLoading={isLoadingCats}
          cats={cats}
          renderCat={(cat) => (
            <CatCardContainer
              key={cat.id}
              cat={cat}
              fetchCats={fetchCats}
              setPanelTitle={setPanelTitle}
              setPanelIsOpen={setPanelIsOpen}
            />
          )}
        />
      </View>
      <Panel isOpen={panelIsOpen} onClose={onClose} title={panelTitle}>
        <PetFormContainer fetchCats={fetchCats} />
      </Panel>
    </PetFormProvider>
  );
};
