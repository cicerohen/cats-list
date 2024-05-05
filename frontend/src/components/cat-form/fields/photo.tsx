import { useRef } from "react";
import { Avatar, Image, Box, Spinner, Button } from "grommet";
import { Field } from "../../field";
import { Values } from "../use-cat-form";

type Props = {
  loading: boolean;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
};

export const Photo = ({ loading, disabled, onChange, onRemove }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Field<Values["photo"]> name="photo" label="">
      {({ field }) => {
        return (
          <Box gap="small" flex direction="column" align="center">
            <Box
              style={{
                position: "relative",
              }}
            >
              <Avatar
                size="3xl"
                overflow="hidden"
                style={{
                  position: "relative",
                }}
              >
                {loading && (
                  <Box
                    background="dark-1"
                    flex
                    justify="center"
                    align="center"
                    width="100%"
                    height="100%"
                    style={{
                      position: "absolute",
                      zIndex: 3,
                    }}
                  >
                    <Spinner size="small" color="white" />
                  </Box>
                )}
                <Image
                  fit="cover"
                  src={field.value.url}
                  fallback="//v2.grommet.io/assets/IMG_4245.jpg"
                />
                <input
                  ref={inputFileRef}
                  type="file"
                  disabled={loading}
                  title="Change photo"
                  aria-label="Change photo"
                  onChange={onChangeHandler}
                  accept=".jpg, .jpeg, .png"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    background: "#fc0",
                    cursor: "pointer",
                    inset: 0,
                    borderRadius: "100%",
                  }}
                />
              </Avatar>
            </Box>
            <Button
              label="Remove photo"
              size="small"
              disabled={disabled || !field.value.url}
              onClick={onRemove}
            />
          </Box>
        );
      }}
    </Field>
  );
};
