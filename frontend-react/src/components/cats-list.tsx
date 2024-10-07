import { Loader } from "./loader";

export const CatsList = {
  Root,
  Body,
  Empty,
  Loading,
};

function Root({ children }: React.PropsWithChildren) {
  return <div className="relative z-0 min-h-[800px]">{children}</div>;
}

function Body({ children }: React.PropsWithChildren) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
  );
}

function Loading() {
  return (
    <div className="absolute w-full bg-red-200">
      <Loader className="absolute" />
    </div>
  );
}

function Empty() {
  return <p className="text-center text-gray-600">No cats to show</p>;
}
