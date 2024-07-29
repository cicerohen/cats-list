import { Link, useLocation } from "react-router-dom";
import { Modal } from "../modal";

export const UnathorizedModal = ({ onClose }: { onClose: () => void }) => {
  const location = useLocation();
  return (
    <Modal.Root show={location.pathname !== "/signin"}>
      <Modal.Backdrop />
      <Modal.Content className="max-w-lg">
        <Modal.Header>
          <Modal.Close onClick={onClose} />
          <Modal.Title>Unauthorized</Modal.Title>
          <Modal.Description>
            Oops! It looks like you're not authenticated.
          </Modal.Description>
        </Modal.Header>
        <Link
          to="/signin"
          className="inline-block rounded-md bg-green-700 px-5 py-3 text-white"
        >
          Sign in
        </Link>
      </Modal.Content>
    </Modal.Root>
  );
};
