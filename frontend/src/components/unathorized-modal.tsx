import { Link, useLocation } from "react-router-dom";
import { Modal, Props } from "./modal";

export const UnathorizedModal = ({ onClose }: Pick<Props, "onClose">) => {
  const location = useLocation();
  return (
    <Modal
      show={location.pathname !== "/signin"}
      title="Unauthorized"
      description="Oops! It looks like you're not authenticated. "
      onClose={onClose}
      className="z-50"
      classNames={{ panel: "max-w-lg" }}
    >
      <Link
        to="/signin"
        className="inline-block rounded-md bg-green-700 px-5 py-3 text-white"
      >
        Sign in
      </Link>
    </Modal>
  );
};
