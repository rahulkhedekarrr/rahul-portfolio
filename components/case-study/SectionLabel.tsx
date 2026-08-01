export default function SectionLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="font-mono text-xs text-sharp-accent">{index}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-sharp-fg sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
