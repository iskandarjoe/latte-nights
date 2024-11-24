import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((
  { className = '', children, ...props },
  ref
) => (
  <div
    ref={ref}
    className={`rounded-xl border bg-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>((
  { className = '', children, ...props },
  ref
) => (
  <div
    ref={ref}
    className={`p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export default Card;