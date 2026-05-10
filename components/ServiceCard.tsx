import { ReactNode } from 'react';

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function ServiceCard({
  icon,
  title,
  description,
  children,
}: ServiceCardProps) {
  return (
    <article className="card flex flex-col h-full">
      <div
        className="w-14 h-14 rounded-soft bg-primary-light flex items-center justify-center text-3xl mb-5"
        aria-hidden="true"
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-primary-dark">{title}</h3>
      <p className="text-text/80 leading-relaxed flex-1">{description}</p>
      {children}
    </article>
  );
}
