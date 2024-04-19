import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import { CatCard } from "./cat-card";
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
        handle: <div>dsdsds</div>,
      },
    }),
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    id: "0",
    name: "Barto",
    description: JSON.stringify([
      {
        type: "paragraph",
        children: [
          {
            text: "Cat description",
          },
        ],
      },
    ]),
    age: {
      id: 0,
      name: "Kitten",
    },
    breed: {
      id: 0,
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
