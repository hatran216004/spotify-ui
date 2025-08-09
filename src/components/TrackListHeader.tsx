import { Clock3 } from 'lucide-react';

export default function TrackListHeader() {
  return (
    <div className="group p-2 grid grid-cols-12 items-center border-b border-[#444] text-[#b3b3b3]">
      <div className="col-span-1 text-sm text-center">#</div>
      <div className="col-span-5">
        <div className="text-sm">Title</div>
      </div>
      <div className="col-span-3">
        <div className="text-sm border-x border-transparent px-4 group-hover:border-[#444]">
          Album
        </div>
      </div>
      <div className="col-span-3">
        <div className="text-sm px-4 flex justify-end">
          <Clock3 size={16} />
        </div>
      </div>
    </div>
  );
}
