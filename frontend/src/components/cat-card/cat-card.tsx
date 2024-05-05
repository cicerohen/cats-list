import { useEffect, useMemo } from "react";
import { Descendant, createEditor } from "slate";
import { withReact } from "slate-react";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "grommet";

import { Description } from "./components/description";
import { resetEditor } from "../../utils/slate-editor";

import { Cat } from "@app/types";

export type Props = Cat & {
  editable: boolean;
};

export const CatCard = ({
  id,
  name,
  age,
  breed,
  description,
  photo,
  editable,
}: Props) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    if (description) {
      resetEditor(editor, JSON.parse(description) as Descendant[]);
    }
  }, [editor, description]);

  return (
    <Card elevation="medium">
      <CardBody>
        <Image fit="cover" src={photo.url} a11yTitle={name} />
        <Box pad={{ horizontal: "medium" }} responsive={false}>
          <Box margin={{ vertical: "medium" }}>
            <Heading level="4" margin={{ bottom: "xsmall" }}>
              {name}
            </Heading>
            <Text color="dark-1" size="small">
              {breed.name}
            </Text>
            <Text color="dark-1" size="small">
              {age.name}
            </Text>
          </Box>
          {description && <Description editor={editor} />}
        </Box>
      </CardBody>

      <CardFooter pad="medium">
        {editable && (
          <Button label="Edit" size="small" primary href={`/cats/${id}/edit`} />
        )}
      </CardFooter>
    </Card>
  );
};
