import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Loader } from "../components/loader";
import { useAuthenticationContext } from "../contexts/authentication-provider";
import { useFetchApi } from "../hooks/use-fetch-api";

import { Cat } from "@app/types";

type Props = {
  children: React.ReactNode;
};

export const CatOwnerEditGuard = ({ children }: Props) => {
  const { authentication } = useAuthenticationContext();
  const [loading, setloading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState(false);

  const fetchApi = useFetchApi();

  const params = useParams();

  useEffect(() => {
    fetchApi<Cat>(`/cats/${params.id}`)
      .then((data) => {
        if (data.data.owner_email === authentication.Username) {
          setIsOwner(true);
        }
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isOwner) {
    return <Navigate to="/" />;
  }

  return children;
};
