import { Notification } from "grommet";

import { Toast as ToastType } from "./types";

export const Toast = ({ status, title, message }: ToastType) => {
  return <Notification toast title={title} status={status} message={message} />;
};
