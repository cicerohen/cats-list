import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import { within, waitFor, expect } from "@storybook/test";

const DEFAULT_EDITOR_VALUE = [
  {
    type: "paragraph",
    children: [
      {
        text: "A furry fusion of elegance and eccentricity, with a side of sass. With eyes that could launch a thousand ships and a meow that's more of a demand than a request, this feline is like having a walking, talking (well, meowing) comedy show in your living room",
      },
    ],
  },
];

import { CatCard, Props } from "./cat-card";
const meta = {
  title: "CatCard",
  component: CatCard,
  decorators: [withRouter],
  parameters: {
    controls: {},
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { id: "0" },
      },
      routing: {
        path: "/cats/:id/edit",
        handle: <div />,
      },
    }),
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    id: "0",
    name: "Barto",
    description: JSON.stringify(DEFAULT_EDITOR_VALUE),
    age: {
      id: "0",
      name: "Kitten",
    },
    breed: {
      id: "0",
      name: "Siamese",
    },
    photo: {
      key: "photo-key",
      url: "/siamese-cat.jpg",
    },
    editable: true,
  },
} satisfies Meta<typeof CatCard>;

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(meta.args.name)).toBeVisible();
    expect(canvas.getByText(meta.args.breed.name)).toBeVisible();
    expect(canvas.getByText(meta.args.age.name)).toBeVisible();

    await waitFor(() =>
      expect(
        canvas.getByText(DEFAULT_EDITOR_VALUE[0].children[0].text),
      ).toBeVisible(),
    );
  },
};
