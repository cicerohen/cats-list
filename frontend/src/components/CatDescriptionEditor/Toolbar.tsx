import { MarkButton } from "./MarkButton";

export const Toolbar = () => {
  return (
    <section className="border-b border-gray-200">
      <div className="flex p-4 space-x-2">
        <MarkButton mark="bold" />
        <MarkButton mark="italic" />
        <MarkButton mark="underline" />
      </div>
    </section>
  );
};
