import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="min-h-screen flex flex-col items-center justify-center p-4">{children}</div>;
}
export default Container;