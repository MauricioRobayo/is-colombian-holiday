import { Link } from "@/components/link";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Wrapper } from "./wrapper";
import { AiOutlineHome } from "react-icons/ai";

interface PathSegment {
  name: string;
  render?: ReactNode;
  path?: string;
}
interface BreadcrumbsProps {
  className?: string;
  breadcrumbs: PathSegment[];
}
function Breadcrumbs({ breadcrumbs, className = "" }: BreadcrumbsProps) {
  breadcrumbs.unshift({
    name: "Home",
    path: "/",
    render: <AiOutlineHome style={{ display: "inline" }} />,
  });

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <div className="border-b-2 border-b-orange-600 bg-orange-200">
      <Wrapper>
        <ol
          className={twMerge(
            "align-center flex justify-center text-sm",
            className
          )}
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((breadcrumbs, i) => {
            return (
              <li key={breadcrumbs.name}>
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
      </Wrapper>
    </div>
  );
}

export default Breadcrumbs;

function isPathSegment(item: PathSegment | SelectSegment): item is PathSegment {
  return "path" in item;
}
