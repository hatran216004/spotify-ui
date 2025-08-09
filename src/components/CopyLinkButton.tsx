import {
  ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  useState
} from 'react';
import { TooltipTrigger, Tooltip, TooltipContent } from './ui/tooltip';
import { useSong } from '@/store/song.store';
import toast from 'react-hot-toast';

export default function CopyLinkButton({
  children
}: {
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const { currentSong } = useSong();

  const handleCopy = async () => {
    const link = `${window.location.origin}/songs/${currentSong?._id}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Copied successfully');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {isValidElement(children)
          ? cloneElement(
              children as React.ReactElement<
                ButtonHTMLAttributes<HTMLButtonElement>
              >,
              {
                onClick: handleCopy
              }
            )
          : children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? 'Copied' : 'Copy link to songs'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
