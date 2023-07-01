import { Format } from "./types";
import { twMerge } from "tailwind-merge";
import { BoldIcon } from "./icons/BoldIcon";
import { ItalicIcon } from "./icons/ItalicIcon";
import { UnderlineIcon } from "./icons/UnderlineIcon";
import { BulletedListIcon } from "./icons/BulletedListIcon";
import { NumberedListIcon } from "./icons/NumberedListIcon";

type ButtonFormat = Extract<
  Format,
  "bold" | "bulleted-list" | "numbered-list" | "italic" | "underline"
>;

type Props = {
  format: ButtonFormat;
  active?: boolean;
};

const icons: Record<ButtonFormat, React.FC<{ className: string }>> = {
  bold: BoldIcon,
  "bulleted-list": BulletedListIcon,
  "numbered-list": NumberedListIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
};

export const FormatButton = ({ format, active = false }: Props) => {
  const Icon = icons[format];
  return (
    <>
      {Icon && (
        <button
          type="button"
          className={twMerge(
            "w-6 h-6 border-0 rounded-sm text-gray-700",
            active && "border border-gray-700"
          )}
        >
          <Icon className=" w-full h-full" />
        </button>
      )}
    </>
  );
};
