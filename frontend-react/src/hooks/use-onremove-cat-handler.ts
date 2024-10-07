import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToasterContext } from "../components/toaster/provider";
import { useCatForm, initialValues } from "../components/cat-form";
import { useCatsContext } from "../contexts/cats-provider";
import { useFetchApi } from "../hooks/use-fetch-api";

type Parameters = {
  petForm: ReturnType<typeof useCatForm>;
};

export const useOnRemoveCatHandler = ({ petForm }: Parameters) => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasterContext();
  const { fetchCats } = useCatsContext();
  const fetchApi = useFetchApi();
  const navigation = useNavigate();
  const params = useParams();

  const onRemove = () => {
    setLoading(true);
    fetchApi(`/cats/${params.id}`, "DELETE")
      .then(() => {
        petForm.resetForm({
          values: initialValues,
        });
        addToast({
          type: "success",
          text: "Cat was removed",
        });

        fetchCats();
        navigation(-1);
      })
      .catch((error) => {
        addToast({
          type: "error",
          text: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    onRemove,
    loading,
  };
};
