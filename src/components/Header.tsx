interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="flex h-14 w-full items-center justify-between border-b px-4">
      {children}
    </div>
  );
}
