import InfoFooter from './InfoFooter';

export default function HomeLayout({
  children
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-auto scrollbar-overlay rounded-[10px]">
      {children}
      <InfoFooter />
    </div>
  );
}
