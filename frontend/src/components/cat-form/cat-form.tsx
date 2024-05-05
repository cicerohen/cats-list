import { FormikProvider } from "formik";
import { BaseEditor } from "slate";
import { Button, Spinner } from "grommet";
import { ReactEditor } from "slate-react";
import { Photo } from "./fields/photo";
import { Name } from "./fields/name";
import { Breed } from "./fields/breed";
import { Age } from "./fields/age";
import { Description } from "./fields/description";

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
          <Button
            type="submit"
            icon={
              (rest.isSubmitting && <Spinner size="xsmall" color="white" />) ||
              undefined
            }
            primary
            label="Save"
            disabled={
              rest.isSubmitting || removingCat || !rest.dirty || loadingPhoto
            }
          />

          {onRemove && (
            <Button
              type="button"
              icon={
                (removingCat && <Spinner size="xsmall" color="brand" />) ||
                undefined
              }
              disabled={rest.isSubmitting || removingCat || loadingPhoto}
              label="Remove cat"
              onClick={onRemove}
            />
          )}
        </div>
      </form>
    </FormikProvider>
  );
};
