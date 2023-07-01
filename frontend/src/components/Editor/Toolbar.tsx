import { FormatButton } from "./FormatButton";

export const Toolbar = () => {
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="flex p-4 space-x-2">
        <FormatButton format="bold" active />
        <FormatButton format="italic" />
        <FormatButton format="underline" />
        <FormatButton format="bulleted-list" />
        <FormatButton format="numbered-list" />
      </div>
    </section>
  );
};
