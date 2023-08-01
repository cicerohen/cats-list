import { useContext } from "react";

import { ToasterContext } from "./ToasterContext";

export const useToasterContext = () => useContext(ToasterContext);
