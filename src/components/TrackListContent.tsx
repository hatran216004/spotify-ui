export default function TrackListContent({
  children
}: {
  children?: React.ReactNode;
}) {
  return <ul className="py-2">{children}</ul>;
}
