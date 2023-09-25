import { Link, useLocation } from "react-router-dom";
import { Modal } from "./modal";

export const UnathorizedModal = () => {
  const location = useLocation();
  return (
    <Modal
      show={location.pathname !== "/signin"}
      title="Unauthorized"
      description="Oops! It looks like you're not authenticated. "
      onClose={() => {}}
      className="z-50"
      classNames={{ panel: "max-w-lg" }}
    >
      <Link
        to="/signin"
        className="inline-block rounded-md bg-lime-600 px-5 py-3 text-white"
      >
        Sign in
      </Link>
    </Modal>
  );
};
