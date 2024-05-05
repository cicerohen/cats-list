import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "grommet";
import { Modal, Props } from "./modal";

export const UnathorizedModal = ({ onClose }: Pick<Props, "onClose">) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Modal
      show={location.pathname !== "/signin"}
      title="Unauthorized"
      description="Oops! It looks like you're not authenticated. "
      onClose={onClose}
      className="z-50"
      classNames={{ panel: "max-w-lg" }}
    >
      <Button
        href="/signin"
        primary
        onClick={(e) => {
          e.preventDefault();
          navigate("/signin");
        }}
        label="Sign in"
      />
    </Modal>
  );
};
