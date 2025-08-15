import {
  ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  useState
} from 'react';
import { TooltipTrigger, Tooltip, TooltipContent } from './ui/tooltip';
import { useTrack } from '@/store/track.store';
import toast from 'react-hot-toast';

export default function CopyLinkButton({
  children
}: {
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const { currentTrack } = useTrack();

  const handleCopy = async () => {
    const link = `${window.location.origin}/tracks/${currentTrack?._id}`;
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
        <p>{copied ? 'Copied' : 'Copy link to tracks'}</p>
      </TooltipContent>
    </Tooltip>
  );
}
