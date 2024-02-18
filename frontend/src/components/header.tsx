import { Link } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { UserMenu } from "./user-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-green-700">
      <div className="flex h-20  items-center justify-between px-8 lg:mx-auto lg:max-w-6xl">
        <h1 className="font-semibold text-white">
          <Link to="/">Cats List</Link>
        </h1>
        <div className="flex space-x-2">
          <Link
            to="/cats/new"
            className="flex items-center rounded-md border border-white px-3 py-2 text-white"
          >
            <PlusIcon className="h-6 w-6" />
            Add a cat
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
