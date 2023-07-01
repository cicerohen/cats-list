import { Header } from "./Header";

type Props = {
  onOpenEditPetModal?: () => void;
  children: React.ReactNode;
};

export const View = ({ onOpenEditPetModal, children }: Props) => {
  return (
    <div>
      <Header onOpenEditPetModal={onOpenEditPetModal} />
      <main className="min-h-[800px] p-8 lg:container lg:mx-auto lg:px-0">
        {children}
      </main>
      <footer className="bg-gray-800">
        <div className="xl:container xl:mx-auto">dsdsd</div>
      </footer>
    </div>
  );
};
