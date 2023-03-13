"use client";

import { Email } from "react-obfuscate-email";
import type { EmailProps } from "react-obfuscate-email";

interface EmailObfuscatorProps extends EmailProps {}
export function EmailObfuscator(props: EmailObfuscatorProps) {
  return <Email {...props} />;
}
