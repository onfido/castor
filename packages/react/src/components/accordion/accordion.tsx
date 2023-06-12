import { c, classy, cssVars, space } from '@onfido/castor';
import type { IconName } from '@onfido/castor-icons';
import { Icon } from '@onfido/castor-react';
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
} from 'react';

export type AccordionItem = {
  name: string;
  isOpen?: boolean;
  title: React.ReactElement;
  iconName?: IconName;
  content: React.ReactElement;
  secondaryContent?: React.ReactElement;
};

export type AccordionStyles = {
  padding?: number;
};

interface AccordionBaseProps {
  list: AccordionItem[];
  onChange?: (accordionItem: AccordionItem) => void;
  onlyOneOpen?: boolean;
  separated?: boolean;
  withSeparator?: boolean;
  styles?: AccordionStyles;
  className?: string;
}

interface AccordionPropsWithoutOnlyOneOpen
  extends Omit<AccordionBaseProps, 'onlyOneOpen'> {
  onlyOneOpen?: never;
}

export type AccordionProps = AccordionBaseProps['separated'] extends true
  ? AccordionPropsWithoutOnlyOneOpen
  : AccordionBaseProps;

const defaultStyles = {
  padding: 3,
};

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

export const Accordion: FC<AccordionProps> = ({
  list: listProps,
  onChange,
  onlyOneOpen = false,
  separated = false,
  withSeparator = false,
  styles: stylesProps = defaultStyles,
  className = '',
}) => {
  const initHeights: number[] = [];
  const [list, setList] = useState(listProps);
  const [heights, setHeights] = useState(initHeights);
  const [ready, setReady] = useState(false);
  const init: HTMLDivElement[] = [];
  const content = useRef(init);
  const [windowWidth] = useWindowSize();
  const [animatedItems, setAnimatedItems] = useState(
    new Array(list.length).fill(false)
  );

  const _styles = {
    ...defaultStyles,
    ...stylesProps,
  };

  const updateHeights = () =>
    setHeights(
      content.current.map((item) => {
        console.log(item.clientHeight);
        return item.clientHeight;
      })
    );

  useEffect(() => {
    setReady(false);
  }, [windowWidth]);

  useEffect(() => {
    if (!ready) {
      updateHeights();
    }
  }, [ready]);

  useEffect(() => {
    if (content.current.length) {
      updateHeights();
    }
  }, [content]);

  useEffect(() => {
    if (heights.length === list.length) {
      setReady(true);
    }
  }, [heights]);

  const handleClick = (index: number) => () => {
    let newList = [...list];

    if (onlyOneOpen && !separated) {
      newList = newList.map((item, newIndex) => ({
        ...item,
        isOpen: newIndex !== index ? false : !item.isOpen,
      }));
    } else {
      newList[index].isOpen = !list[index].isOpen;
    }
    setList(newList);
    if (onChange) onChange(newList[index]);
  };

  const handleRef = (index: number) => (el: HTMLDivElement) =>
    (content.current[index] = el);

  const style = cssVars({ padding: space(_styles.padding) });

  const animate = (index: number, started: boolean) => () => {
    const newAnimatedItems = [...animatedItems];
    newAnimatedItems[index] = started;
    setAnimatedItems(newAnimatedItems);
  };

  useLayoutEffect(() => {
    list.forEach((_, index) => {
      const el = content.current[index];
      el.addEventListener('transitionstart', animate(index, true));
      el.addEventListener('transitionend', animate(index, false));
    });

    return () =>
      list.forEach((_, index) => {
        const el = content.current[index];
        el.removeEventListener('transitionstart', animate(index, true));
        el.removeEventListener('transitionend', animate(index, false));
      });
  }, []);

  return (
    <div
      style={style}
      className={classy(c('accordion-box'), className, {
        '-separated': separated,
      })}
    >
      {list.map((item, index) => (
        <div
          key={index}
          className={classy(c('accordion-item'), { '-open': item.isOpen })}
        >
          <button
            className={classy(c('accordion-toggler'))}
            onClick={handleClick(index)}
            aria-expanded={item.isOpen}
            aria-controls={`${item.name}-content`}
            id={`${item.name}-toggler`}
          >
            {item.iconName && <Icon name={item.iconName} aria-hidden="true" />}
            <span className={classy(c('accordion-title'))}>{item.title}</span>
            {item.secondaryContent && (
              <span className={classy(c('accordion-secondary-content'))}>
                {item.secondaryContent}
              </span>
            )}
            <Icon
              className={classy(c('accordion-chevron'))}
              name="chevron-down"
              aria-hidden="true"
            />
          </button>
          <div
            id={`${item.name}-content`}
            ref={handleRef(index)}
            role="region"
            aria-labelledby={`${item.name}-toggler`}
            className={classy(c('accordion-content-wrapper'), {
              '-ready': ready,
              '-with-separator': withSeparator,
            })}
            style={{
              height: ready ? (item.isOpen ? heights[index] : 0) : 'auto',
            }}
            aria-hidden={!item.isOpen}
          >
            {(!ready ||
              content.current[index].clientHeight !== 0 ||
              animatedItems[index]) && (
              <div className={classy(c('accordion-content'))}>
                {item.content}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
