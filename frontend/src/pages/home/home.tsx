import { useState, useMemo, useEffect } from "react";

import { View } from "../../components/view";
import { CatList } from "../../components/cat-list";
import { Header } from "../../components/header";

import { useToasterContext } from "../../components/toaster/toaster-context";
import { usePetForm } from "../../components/pet-form/use-pet-form";

import { Cat } from "@app/types";

import { CatCardContainer } from "./containers/cat-card-container";
import { useAuthenticationContext } from "../../contexts/authentication-provider";
import { useFetchApi } from "../../hooks/use-fetch-api";

export const HomePage = () => {
  const fetchApi = useFetchApi();
  const { addToast } = useToasterContext();
  const { authentication } = useAuthenticationContext();

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

  return (
    <>
      <View header={<Header userAttributes={authentication.UserAttributes} />}>
        <CatList
          showLoading={isLoadingCats}
          cats={cats}
          renderCat={(cat) => <CatCardContainer key={cat.id} cat={cat} />}
        />
      </View>
    </>
  );
};
