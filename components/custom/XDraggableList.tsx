'use client';
import { MouseEvent, ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const XDraggableList = ({
  children,
  styling,
}: {
  children: ReactNode;
  styling?: string;
}) => {
  const dragContainer = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event: MouseEvent<HTMLUListElement>) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setScrollLeft(dragContainer.current?.scrollLeft || 0);
  };

  const handleMouseMove = (event: MouseEvent<HTMLUListElement>) => {
    if (!isDragging || !dragContainer.current) return;

    const distance = event.clientX - startX;
    dragContainer.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <ul
      ref={dragContainer}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        'little-scrollbar select-none overflow-x-auto hover:cursor-pointer',
        styling,
      )}
    >
      {children}
    </ul>
  );
};

export default XDraggableList;
