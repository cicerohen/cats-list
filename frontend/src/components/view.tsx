type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export const View = ({ header, children }: Props) => {
  return (
    <div>
      {header}
      <main className="min-h-[800px] p-8 lg:container lg:mx-auto lg:px-0">
        {children}
      </main>
      <footer className="bg-gray-800">
        <div className="xl:container xl:mx-auto">dsdsd</div>
      </footer>
    </div>
  );
};
