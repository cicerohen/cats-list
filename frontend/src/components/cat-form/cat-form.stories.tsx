import type { Meta, StoryObj } from "@storybook/react";
import {
  userEvent,
  within,
  fireEvent,
  waitForElementToBeRemoved,
  expect,
  fn,
} from "@storybook/test";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import { CatForm, Props } from "./cat-form";
import { useCatForm, initialValues } from "./use-cat-form";
import { useEffect } from "react";

const meta = {
  title: "CatForm",
  component: CatForm,
  decorators: [withRouter],
  parameters: {
    controls: {},
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { id: "0" },
      },
      routing: {
        path: "/cats/:id/edit",
        handle: <div>dsdsds</div>,
      },
    }),
  },
  tags: ["autodocs"],
  argTypes: {
    loadingPhoto: Boolean,
    removingCat: Boolean,
  },
  args: {
    breeds: [
      { id: "0", name: "Siamese" },
      { id: "1", name: "Persian" },
    ],
    ages: [{ id: "0", name: "Senior(+7 years)" }],
    loadingPhoto: false,
    removingCat: false,
    onChangePhoto: fn(),
    onRemovePhoto: fn(),
    onRemove: fn(),
  },
  render: function Render({
    breeds,
    ages,
    loadingPhoto,
    removingCat,
    onChangePhoto,
    onRemovePhoto,
    onRemove,
  }: Props) {
    const form = useCatForm({
      onSubmit: () => {},
    });

    useEffect(() => {
      form.resetForm({
        values: {
          ...initialValues,

          photo: {
            key: "photo-key",
            url: "/siamese-cat.jpg",
          },
        },
      });
    }, []);

    return (
      <CatForm
        {...form}
        breeds={breeds}
        ages={ages}
        loadingPhoto={loadingPhoto}
        removingCat={removingCat}
        onChangePhoto={onChangePhoto}
        onRemovePhoto={onRemovePhoto}
        onRemove={onRemove}
      />
    );
  },
} satisfies Meta<Props>;

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTitle("Save cat")).not.toBeEnabled();

    await userEvent.type(
      canvas.getByPlaceholderText("Enter your cat name"),
      "Barto",
    );

    expect(canvas.getByPlaceholderText("Enter your cat name")).toHaveValue(
      "Barto",
    );

    await userEvent.type(
      canvas.getByPlaceholderText("Select the cat breed"),
      "Sia",
    );

    expect(canvas.getByRole("listbox")).toBeVisible();
    expect(canvas.getAllByRole("option")).toHaveLength(2);

    await userEvent.click(canvas.getAllByRole("option")[0]);
    expect(canvas.getByPlaceholderText("Select the cat breed")).toHaveValue(
      meta.args.breeds[0].name,
    );

    await waitForElementToBeRemoved(canvas.getByRole("listbox"));

    await userEvent.click(canvas.getByLabelText("Select the cat age"));

    expect(canvas.getByRole("listbox")).toBeVisible();
    expect(canvas.getAllByRole("option")).toHaveLength(1);

    await userEvent.click(canvas.getAllByRole("option")[0]);

    expect(canvas.getByLabelText("Select the cat age")).toHaveTextContent(
      meta.args.ages[0].name,
    );

    await waitForElementToBeRemoved(canvas.getByRole("listbox"));

    await userEvent.type(canvas.getAllByRole("textbox")[1], "Cat description");

    expect(canvas.getAllByRole("textbox")[1]).toHaveTextContent(
      "Cat description",
    );

    expect(canvas.getByTitle("Save cat")).toBeEnabled();

    await fireEvent.change(canvas.getByLabelText("Change photo"));
    expect(meta.args.onChangePhoto).toBeCalledTimes(1);

    await userEvent.click(canvas.getByTitle("Remove current photo"));
    expect(meta.args.onRemovePhoto).toBeCalledTimes(1);

    await userEvent.click(canvas.getByTitle("Remove cat"));
    expect(meta.args.onRemove).toBeCalledTimes(1);
  },
};
