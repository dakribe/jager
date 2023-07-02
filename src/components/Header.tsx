import User from "./User";

export default function Header() {
  return (
    <div className="h-16 border-b-2 border-muted flex items-center justify-between px-6">
      <div>
        <p className="font-bold text-3xl">Jager</p>
      </div>
      <div>
        <User />
      </div>
    </div>
  );
}
