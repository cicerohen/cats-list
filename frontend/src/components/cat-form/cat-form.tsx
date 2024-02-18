import { FormikProvider } from "formik";
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { Photo } from "./fields/photo";
import { Name } from "./fields/name";
import { Breed } from "./fields/breed";
import { Age } from "./fields/age";
import { Description } from "./fields/description";
import { SubmitButton } from "./buttons/submit-button";
import { RemoveButton } from "./buttons/remove-button";

import { useCatForm } from "./use-cat-form";
import { Breed as BreedType, Age as AgeType } from "@app/types";

export type Props = ReturnType<typeof useCatForm> & {
  breeds: BreedType[];
  ages: AgeType[];
  editor: BaseEditor & ReactEditor;
  loadingPhoto: boolean;
  removingCat?: boolean;
  onChangePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
  onRemove?: () => void;
};

export const CatForm = ({
  breeds,
  ages,
  loadingPhoto,
  removingCat,
  editor,
  onChangePhoto,
  onRemovePhoto,
  onRemove,
  ...rest
}: Props) => {
  return (
    <FormikProvider value={rest}>
      <form className="space-y-4" onSubmit={rest.handleSubmit}>
        <div className="flex justify-center">
          <Photo
            loading={loadingPhoto}
            disabled={loadingPhoto || removingCat || rest.isSubmitting}
            onChange={onChangePhoto}
            onRemove={onRemovePhoto}
          />
        </div>
        <Name />
        <Breed breeds={breeds} />
        <Age ages={ages} />
        <Description editor={editor} />
        <div className="flex items-center space-x-2">
          <SubmitButton
            loading={rest.isSubmitting}
            disabled={
              rest.isSubmitting || removingCat || !rest.dirty || loadingPhoto
            }
          />

          {onRemove && (
            <RemoveButton
              loading={removingCat || false}
              disabled={rest.isSubmitting || removingCat || loadingPhoto}
              onClick={onRemove}
            />
          )}
        </div>
      </form>
    </FormikProvider>
  );
};
