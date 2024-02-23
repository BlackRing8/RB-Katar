const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-full w-full bg-sky-500 justify-end items-center sm:pr-24">{children}</div>;
};

export default AuthLayout;
