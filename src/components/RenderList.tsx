/* eslint-disable @typescript-eslint/no-explicit-any */

export default function RenderList({
  data,
  render
}: {
  data: any;
  render: (ele: any, index: number) => React.ReactNode;
}) {
  return <>{data.map(render)}</>;
}
