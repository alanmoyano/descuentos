import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

type InputProps = ComponentProps<typeof Input>;

export const InputGroup = ({
  prefix,
  suffix,
  className,
  ...props
}: {
  prefix?: string;
  suffix?: string;
} & InputProps) => {
  return (
    <div className="relative flex w-full items-center">
      {prefix && (
        <div className="pointer-events-none absolute left-0 flex h-full items-center justify-center px-3 text-gray-500">
          {prefix}
        </div>
      )}
      <div className="flex w-full flex-1 items-center">
        <Input
          className={cn(
            prefix ? "pl-8" : "",
            suffix ? "pr-8" : "",
            "w-full items-center",
            className,
          )}
          {...props}
        />
      </div>

      {suffix && (
        <div className="pointer-events-none absolute right-0 flex h-full items-center justify-center px-3 text-gray-500">
          {suffix}
        </div>
      )}
    </div>
  );
};
