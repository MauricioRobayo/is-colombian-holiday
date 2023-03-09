import { formatDateAsPath, longDateFormatter } from "@/utils/date-helpers";
import { HiOutlineShare } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { Breadcrumbs, BreadcrumbsProps } from "./breadcrumbs";
import { Link } from "./link";
import { ShareButton } from "./share-button";
import { Wrapper } from "./wrapper";

interface SubHeaderProps {
  breadcrumbs: BreadcrumbsProps["breadcrumbs"];
  className?: string;
}

export function SubHeader({ breadcrumbs, className = "" }: SubHeaderProps) {
  const date = new Date();
  return (
    <>
      <div className={twMerge(" bg-orange-200 text-sm", className)}>
        <Wrapper>
          <p>In Colombia today is</p>
          <Link href={formatDateAsPath(date)} title="Today" className="text-sm">
            <time dateTime={date.toISOString()}>
              {longDateFormatter.format(date)}
            </time>
          </Link>
        </Wrapper>
      </div>
      <div
        className={twMerge(
          "border-b-2 border-slate-300 bg-slate-200 text-sm",
          className
        )}
      >
        <Wrapper className="align-center flex justify-center gap-4 pt-3 pb-2">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <ShareButton variant="icon" className="flex items-center gap-1">
            Share <HiOutlineShare />
          </ShareButton>
        </Wrapper>
      </div>
    </>
  );
}
