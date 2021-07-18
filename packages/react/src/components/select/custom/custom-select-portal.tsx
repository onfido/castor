import React, {
  MutableRefObject,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export const CustomSelectPortal = ({
  id,
  children: { select, dropdown },
}: CustomSelectPortalProps): JSX.Element => {
  const target = usePortal(id);
  const [ref, dimensions] = useDimensions();

  target.style['position'] = 'fixed';

  if (dimensions) {
    target.style['top'] = `${dimensions.y + dimensions.height}px`;
    target.style['left'] = `${dimensions.x}px`;
    target.style['width'] = `${dimensions.width}px`;
  }

  return (
    <>
      {select(ref)}
      {createPortal(dropdown, target)}
    </>
  );
};

export interface CustomSelectPortalProps {
  children: {
    dropdown: ReactNode;
    select: (ref: MutableRefObject<HTMLElement | null>) => void;
  };
  id: string;
}

const usePortal = (id: string): HTMLDivElement => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existingEl = document.querySelector(`#${id}`);
    const element = existingEl || createElement(id);

    if (!existingEl) addElement(element);
    if (ref.current) element.appendChild(ref.current);

    return () => {
      ref.current?.remove();
      if (!element.childElementCount) element.remove();
    };
  }, [id]);

  return (ref.current ??= document.createElement('div'));
};

function createElement(id: string): HTMLDivElement {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
}

function addElement(el: Element): void {
  document.body.appendChild(el);
}

const useDimensions = (): [
  MutableRefObject<HTMLElement | null>,
  DimensionObject | null
] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<DimensionObject | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const measure = () =>
      window.requestAnimationFrame(() => {
        if (ref.current) setDimensions(getDimensionObject(ref.current));
      });
    measure();

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [ref]);

  return [ref, dimensions];
};

function getDimensionObject(el: HTMLElement): DimensionObject {
  const { height, width, x, y } = el.getBoundingClientRect();
  return { height, width, x, y };
}

interface DimensionObject {
  height: number;
  width: number;
  x: number;
  y: number;
}
