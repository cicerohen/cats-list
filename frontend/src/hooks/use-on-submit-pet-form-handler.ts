import { useNavigate } from "react-router-dom";
import { useCatForm, initialValues } from "../components/cat-form";
import { useToasterContext } from "../components/toaster/provider";
import { useCatsContext } from "../contexts/cats-provider";
import { useFetchApi } from "./use-fetch-api";

import { Cat } from "@app/types";

export const useOnSubmitPetFormHandler = () => {
  const { fetchCats } = useCatsContext();
  const { addToast } = useToasterContext();
  const fetchApi = useFetchApi();
  const navigation = useNavigate();

  const form = useCatForm({
    onSubmit: (values, helpers) => {
      const isNew = !values.id;

      if (isNew) {
        fetchApi("/cats", "POST", JSON.stringify(values))
          .then(() => {
            form.resetForm({
              values: initialValues,
            });

            addToast({
              status: "normal",
              title: "Cat was added",
              message: "",
            });

            fetchCats();
            navigation(-1);
          })
          .catch((error) => {
            addToast({
              status: "critical",
              title: error.message,
              message: "",
            });
          });

        return;
      }

      fetchApi<Cat>(`/cats/${values.id}`, "PATCH", JSON.stringify(values))
        .then((data) => {
          helpers.resetForm({
            values: data.data,
          });

          addToast({
            status: "normal",
            title: "Cat was updated",
            message: "",
          });

          fetchCats();
        })
        .catch((error) => {
          addToast({
            status: "critical",
            title: error.message,
            message: "",
          });
        });
    },
  });
  return form;
};
