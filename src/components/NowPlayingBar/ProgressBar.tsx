export default function ProgressBar({
  value = 30
}: {
  value?: number;
  currentTime?: number;
  endTime?: number;
}) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <span className="text-xs text-[#929092]">0:26</span>
      <div className="h-1 w-[516px] max-w-full rounded-full bg-white">
        <div
          className="h-1 bg-[#1db954] relative rounded-full"
          style={{ width: `${value}%` }}
        >
          <span className="absolute w-3 h-3 rounded-full bg-white translate-x-1/2 -translate-y-1/2 top-1/2 right-0 shadow-2xl"></span>
        </div>
      </div>
      <span className="text-xs text-[#929092]">4:53</span>
    </div>
  );
}
