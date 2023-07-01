import { Link } from "react-router-dom";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

type Props = {
  onOpenEditPetModal?: () => void;
};

export const Header = ({ onOpenEditPetModal }: Props) => {
  return (
    <header className="sticky top-0 z-10 bg-lime-600">
      <div className="flex h-20  items-center justify-between px-8 lg:container lg:mx-auto lg:px-0">
        <h1 className="font-semibold text-white">
          <Link to="/">Pet Shelf</Link>
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={onOpenEditPetModal}
            className="flex items-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white"
          >
            <PlusIcon className="h-5 w-5" />
            Add
          </button>
          <button className="rounded-md p-2 text-white sm:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
