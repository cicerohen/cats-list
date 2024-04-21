export type Breed = {
  id: string;
  name: string;
};

export type Age = {
  id: string;
  name: string;
};

export type Cat = {
  id: string;
  name: string;
  age: Age;
  breed: Breed;
  description: string;
  owner_email: string;
  photo: {
    key: string;
    url: string;
  };
};

export type HTTPMethod =
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "TRACE"
  | "CONNECT"
  | "POST"
  | "PUT"
  | "DELETE";

export type UserAttributes = {
  email: string;
  name: string;
};

export type AuthenticationResult = {
  AccessToken?: string;
  ExpiresIn?: number;
  TokenType?: string;
  RefreshToken?: string;
  IdToken?: string;
  NewDeviceMetadata: {
    DeviceKey?: string;
    DeviceGroupKey?: string;
  };
};

export type Authentication = {
  AuthenticationResult?: AuthenticationResult;
  UserAttributes?: UserAttributes;
  Username?: string;
};
