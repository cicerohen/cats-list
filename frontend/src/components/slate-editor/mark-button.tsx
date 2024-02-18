import { twMerge } from "tailwind-merge";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "./icons";
import { useSlate } from "slate-react";

import { Mark, toggleMark, isMarkActive } from "../../utils/slate-editor";

type Props = {
  mark: Mark;
  disabled: boolean;
};

const icons: Record<Mark, React.FC<{ className: string }>> = {
  bold: BoldIcon,
  italic: ItalicIcon,
  underline: UnderlineIcon,
};

export const MarkButton = ({ mark, disabled }: Props) => {
  const Icon = icons[mark];
  const editor = useSlate();

  const isActive = (): boolean => {
    return isMarkActive(editor, mark);
  };

  const onToggleMark = () => {
    toggleMark(editor, mark);
  };

  if (Icon) {
    return (
      <button
        disabled={disabled}
        type="button"
        className={twMerge(
          "inline-block h-5  w-5 rounded-sm border-0 text-gray-600 disabled:opacity-50",
          (!disabled && isActive() && "opacity-100") ||
            "opacity-50 hover:opacity-100",
        )}
        onMouseDown={onToggleMark}
      >
        <Icon className=" h-full w-full" />
      </button>
    );
  }
  return null;
};
