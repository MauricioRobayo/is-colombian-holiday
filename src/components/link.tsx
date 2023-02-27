import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

type LinkProps = NextLinkProps & React.HTMLAttributes<HTMLAnchorElement>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink className={twMerge("text-blue-600", className)} {...props}>
      {children}
    </NextLink>
  );
}
