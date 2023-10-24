import * as Yup from "yup";

export const Schema = Yup.object({
  password: Yup.string().when("repeatPassword", {
    is: (repeatPassword: string) => repeatPassword,
    then: Yup.string().oneOf([Yup.ref("password")], "dsdsds"),
  }),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match",
  ),
});
