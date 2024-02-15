"use client";
import { PRODUCT_CATEGORIES } from "@/config/items";
import { useEffect, useRef, useState } from "react";
import Navitem from "./Navitem";
import { useHandleClick } from "@/lib/use-click";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  let navref = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    const handle = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("keydown", handle);
    };
  }, []);
  useHandleClick(navref, () => {
    setActiveIndex(null);
  });
  return (
    <div className="flex gap-4 h-full" ref={navref}>
      {PRODUCT_CATEGORIES.map((el, i) => {
        const handleOpen = () => {
          if (activeIndex !== i) {
            setActiveIndex(i);
          } else {
            setActiveIndex(null);
          }
        };
        const isOpen = activeIndex === i;
        const isAnyOpen = activeIndex !== null;
        return (
          <Navitem
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
            handleOpen={handleOpen}
            category={el}
            key={el.value}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
