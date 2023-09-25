import { CatCard } from "../../../components/cat-card";
import { useToasterContext } from "../../../components/toaster/toaster-context";

import { Cat } from "@app/types";
import { useState } from "react";

type Props = {
  cat: Cat;
};

export const CatCardContainer = ({ cat }: Props) => {
  const [removing, setRemoving] = useState<boolean>(false);
  const toaster = useToasterContext();

  const onEdit = () => {};

  // const onRemove = () => {
  //   setRemoving(true);
  //   fetchApi<Cat>(`/cats/${cat.id}`, "DELETE")
  //     .then(() => {
  //       toaster.addToast({
  //         type: "success",
  //         text: "Cat successfuly removed",
  //       });
  //       form.resetForm({
  //         values: initialValues,
  //       });
  //     })
  //     .catch((error) => {
  //       toaster.addToast({
  //         type: "error",
  //         text: error.message,
  //       });
  //     })
  //     .finally(() => {
  //       setRemoving(false);
  //     });
  // };

  return (
    <CatCard {...cat} onEdit={onEdit} onRemove={() => {}} removing={removing} />
  );
};
