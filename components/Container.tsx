// components/Container.tsx
import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="pt-20 px-4 md:px-8  w-full">
      {children}
    </div>
  );
}
