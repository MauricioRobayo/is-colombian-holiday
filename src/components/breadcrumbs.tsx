import { Link } from "@/components/link";
import { ReactNode } from "react";
import { TbHome } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

interface PathSegment {
  name: string;
  render?: ReactNode;
  path?: string;
}
export interface BreadcrumbsProps {
  className?: string;
  breadcrumbs: PathSegment[];
}
export function Breadcrumbs({ breadcrumbs, className = "" }: BreadcrumbsProps) {
  breadcrumbs.unshift({
    name: "Home",
    path: "/",
    render: <TbHome />,
  });

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <ol
      className={twMerge("align-center flex justify-center text-sm", className)}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {breadcrumbs.map((breadcrumbs, i) => {
        return (
          <li key={breadcrumbs.name} className="flex items-center">
            {breadcrumbs.path ? (
              <>
                <Link
                  href={breadcrumbs.path}
                  title={breadcrumbs.name}
                  itemProp="item"
                >
                  <span itemProp="name">
                    {breadcrumbs.render ?? breadcrumbs.name}
                  </span>
                  <meta itemProp="position" content={`${i + 1}`} />
                </Link>
                <span className="mx-1">/</span>
              </>
            ) : (
              <>
                <span itemProp="name" className="font-bold">
                  {breadcrumbs.name}
                </span>
                <meta itemProp="position" content={`${i + 1}`} />
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
