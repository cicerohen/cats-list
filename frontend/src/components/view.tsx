import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

export const View = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className="min-h-[800px] p-8 lg:mx-auto lg:max-w-6xl">
        {children}
      </main>
    </div>
  );
};
