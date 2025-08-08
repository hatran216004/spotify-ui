import SectionSeparator from '@/components/SectionSeparator';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InfoFooter() {
  return (
    <footer className="pt-12 pb-4">
      <SectionSeparator className="mx-8 opacity-20" />
      <div className="p-8 grid grid-cols-12">
        <div className="col-span-3 text-[16px]">
          <p className="text-white font-bold">Company</p>
          <ul className="text-[#b3b3b3] font-[400]">
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                About
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Jobs
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                For the Record
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3 text-[16px]">
          <p className="text-white font-bold">Communities</p>
          <ul className="text-[#b3b3b3] font-[400]">
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                For Artists
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Developers
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Advertising
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Investors
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Vendors
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3 text-[16px]">
          <p className="text-white font-bold">Usefull links</p>
          <ul className="text-[#b3b3b3] font-[400]">
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Support
              </Link>
            </li>
            <li>
              <Link className="p-1 inline-block hover:underline" to="#">
                Popular by Country
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <ul className="flex items-center gap-4">
            <li className="w-10 h-10 rounded-full shadow-2xl bg-[#292929] hover:opacity-90 flex items-center justify-center text-white">
              <Instagram size={16} />
            </li>
            <li className="w-10 h-10 rounded-full shadow-2xl bg-[#292929] hover:opacity-90 flex items-center justify-center text-white">
              <Twitter />
            </li>
            <li className="w-10 h-10 rounded-full shadow-2xl bg-[#292929] hover:opacity-90 flex items-center justify-center text-white">
              <Facebook size={16} />
            </li>
          </ul>
        </div>
      </div>
      <SectionSeparator className="mx-8 opacity-20" />
      <p className="text-center mt-4 text-[#b3b3b3] text-sm">
        Copyright © 2025 HaTran - Spotify Clone
      </p>
    </footer>
  );
}
