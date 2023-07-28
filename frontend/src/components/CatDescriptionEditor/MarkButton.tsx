import { twMerge } from "tailwind-merge";
import { BoldIcon } from "./icons/BoldIcon";
import { ItalicIcon } from "./icons/ItalicIcon";
import { UnderlineIcon } from "./icons/UnderlineIcon";
import { useSlate } from "slate-react";

import { Mark, toggleMark, isMarkActive } from "../../services/editor-api";

type Props = {
  mark: Mark;
};

const icons: Record<Mark, React.FC<{ className: string }>> = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
};

export const MarkButton = ({ mark }: Props) => {
  const Icon = icons[mark];
  const editor = useSlate();

  const isActive = (): boolean => {
    return isMarkActive(editor, mark);
  };

  const onToggleMark = () => {
    toggleMark(editor, mark);
  };

  return (
    <>
      {Icon && (
        <button
          type="button"
          className={twMerge(
            "w-5 h-5 border-0 rounded-sm text-gray-600",
            (isActive() && "opacity-100") || "opacity-50 hover:opacity-100"
          )}
          onMouseDown={onToggleMark}
        >
          <Icon className=" w-full h-full" />
        </button>
      )}
    </>
  );
};
