import { useState, useRef, useEffect, Children, cloneElement } from "react";
import "./FadeInChildren.css";
const FadeInChildren = ({
  children,
  toLeft,
}: {
  children: any;
  toLeft?: boolean;
}) => {
  const [isVisible, setVisible] = useState(Children.toArray(children).map(() => false));
  const childRefs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    childRefs.current.forEach((childRef, i) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prevIsVisible: any) =>
                prevIsVisible.map((visible: any, index: any) =>
                  index === i ? true : visible
                )
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "-20% 0% -20% 0%" }
      );
      if (childRef) {
        observer.observe(childRef);
      }
      return () => {
        observer.disconnect();
      };
    });
  }, []);

  const newChildren = Children.map(children, (child, index) => {
    return cloneElement(child, {
      ref: (node: HTMLElement | null) => {
        childRefs.current[index] = node;
      },

      className: toLeft
        ? isVisible[index]
          ? "hide-from-right fade-in-left"
          : "hide-from-right"
        : isVisible[index]
          ? "hide-from-left fade-in-right"
          : "hide-from-left",
    });
  });

  return <>{newChildren}</>;
};

export default FadeInChildren;
