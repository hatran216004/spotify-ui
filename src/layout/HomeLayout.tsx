import InfoFooter from './InfoFooter';

export default function HomeLayout({
  children
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      {children}
      <InfoFooter />
    </>
  );
}
