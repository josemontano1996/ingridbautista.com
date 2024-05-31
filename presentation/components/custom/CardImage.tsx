'use client';

import Image from 'next/image';

const CardImage = ({ image, name }: { image: string; name: string }) => {
  return (
    <Image
      onMouseDown={(e) => e.preventDefault()}
      className="aspect-square rounded-xl object-cover"
      src={image}
      width={350}
      height={350}
      alt={name}
    />
  );
};

export default CardImage;
