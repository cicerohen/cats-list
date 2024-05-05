import {
  Header as GrommetHeader,
  Text,
  Box,
  Button,
  Menu,
  Avatar,
} from "grommet";

import { useNavigate } from "react-router-dom";

import { User } from "grommet-icons";
import { useAuthenticationContext } from "../contexts/authentication-provider";

export const Header = () => {
  const { authentication } = useAuthenticationContext();
  const navigate = useNavigate();

  return (
    <GrommetHeader background="brand" pad="small">
      <Box flex>
        <Text weight="bold">Cats List</Text>
      </Box>

      <Box flex="shrink" alignContent="end" direction="row">
        <Box flex justify="center">
          <Button
            href="/cats/new"
            primary
            label="Add a cat"
            onClick={(e) => {
              e.preventDefault();
              navigate("/cats/new");
            }}
          />
        </Box>

        {authentication.UserAttributes && (
          <Menu
            icon={false}
            dropProps={{
              align: { top: "bottom", left: "left" },
              elevation: "large",
            }}
            label={
              <Avatar background="light-2">
                <User size="medium" />
              </Avatar>
            }
            items={[
              {
                label: "Profile",
                href: "/profile",
                onClick: (e) => {
                  e.preventDefault();
                  navigate("/profile");
                },
              },
              {
                label: "Sign out",
                href: "/signout",
                onClick: (e) => {
                  e.preventDefault();
                  navigate("/signout");
                },
              },
            ]}
          />
        )}
        {!authentication.UserAttributes && (
          <Menu
            icon={false}
            color="red"
            dropProps={{
              align: { top: "bottom", left: "left" },
              elevation: "large",
            }}
            label={
              <Avatar background="light-6">
                <User size="medium" />
              </Avatar>
            }
            items={[
              {
                label: "SignIn",
                href: "/signin",
                onClick: (e) => {
                  e.preventDefault();
                  navigate("/signin");
                },
              },
              {
                label: "Sign Up",
                href: "/signup",
                onClick: (e) => {
                  e.preventDefault();
                  navigate("/signup");
                },
              },
            ]}
          />
        )}
      </Box>
    </GrommetHeader>
  );
};
