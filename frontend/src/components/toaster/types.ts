import { NotificationProps } from "grommet";
export type Toast = {
  id: string;
  status: NotificationProps["status"];
  title: string;
  message: string;
};
