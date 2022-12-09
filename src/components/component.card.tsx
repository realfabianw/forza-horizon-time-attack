export default function CardComponent(children: React.ReactNode) {
  return (
    <div className="h-full rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 p-1/2">
      <div className="h-full w-full rounded-lg bg-zinc-800">{children}</div>
    </div>
  );
}
