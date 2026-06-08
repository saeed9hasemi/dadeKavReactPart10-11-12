interface IContainer {
  children: React.ReactNode;
}

function Container({ children }: IContainer) {
  return <div className="w-full max-w-7xl mx-auto px-4 ">{children}</div>;
}

export default Container;
