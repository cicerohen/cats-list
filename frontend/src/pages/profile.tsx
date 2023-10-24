import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";
import { ProfileForm } from "../components/profile-form";
import { useProfileForm } from "../components/profile-form/use-profile-form";
import { usePasswordForm } from "../components/profile-form/use-password-form";

export const ProfilePage = () => {
  const navigation = useNavigate();

  const profileForm = useProfileForm({
    onSubmit: () => {},
  });

  const passwordForm = usePasswordForm({
    onSubmit: () => {},
  });

  const onCloseModal = () => {
    navigation("/");
  };

  return (
    <Modal show title="Edit profile" onClose={onCloseModal}>
      <ProfileForm profileForm={profileForm} passwordForm={passwordForm} />
    </Modal>
  );
};
