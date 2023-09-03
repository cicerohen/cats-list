import { createContext, useContext } from "react";

import { Cat } from "@app/types";
import { usePetForm } from "../../../components/pet-form/use-pet-form";

type Form = ReturnType<typeof usePetForm>;

type Context = {
  form: Form;
  initialValues: Cat;
};

type Props = Context & {
  children: React.ReactNode;
};

const Context = createContext({} as Context);

export const PetFormProvider = ({ form, initialValues, children }: Props) => {
  return (
    <Context.Provider value={{ form, initialValues }}>
      {children}
    </Context.Provider>
  );
};

export const usePetFormContext = () => useContext(Context);
