import React, { memo, type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4">
    {children}
  </div>
);

export default memo(Container);