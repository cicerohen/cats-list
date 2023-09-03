export type Breed = {
  id: number;
  name: string;
};

export type Age = {
  id: number;
  name: string;
};

export type Cat = {
  id: string;
  name: string;
  age: Age;
  breed: Breed;
  description: string;
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
