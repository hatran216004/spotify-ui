/* eslint-disable @typescript-eslint/no-explicit-any */
import ColorThief from 'colorthief';
import { useEffect, useState } from 'react';

export function useDominantColor(
  imgRef: React.RefObject<HTMLImageElement | null>,
  deps: any
) {
  const [color, setColor] = useState<[number, number, number]>();

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;
    const colorThief = new ColorThief();

    const handleLoad = () => {
      try {
        const [r, g, b] = colorThief.getColor(imgElement);
        setColor([r, g, b]);
      } catch (err) {
        console.error(err);
      }
    };

    imgElement.addEventListener('load', handleLoad);
    return () => imgElement.removeEventListener('load', handleLoad);
  }, [deps, imgRef]);

  return { color };
}
