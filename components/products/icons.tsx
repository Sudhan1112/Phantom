import type { ReactElement } from "react";
import type { ProductId } from "./products.config";

type IconProps = { className?: string; active?: boolean };

export function MicIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a3.5 3.5 0 0 0-3.5 3.5v6a3.5 3.5 0 0 0 7 0v-6A3.5 3.5 0 0 0 12 2Z" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3.5" />
      <path d="M8.5 21.5h7" />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </svg>
  );
}

export function KeyboardIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  );
}

export function TypeIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5V7" />
      <path d="M12 4v16" />
      <path d="M8 20h8" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8.5 5.8c0-.9.9-1.4 1.6-.9l9 5.2c.7.4.7 1.4 0 1.8l-9 5.2c-.7.4-1.6-.1-1.6-.9V5.8Z" />
    </svg>
  );
}

const ICONS: Record<ProductId, (props: IconProps) => ReactElement> = {
  stt: MicIcon,
  visual: EyeIcon,
  capslock: KeyboardIcon,
  autotyping: TypeIcon,
};

export function ProductIcon({
  id,
  className,
}: {
  id: ProductId;
  className?: string;
}) {
  const Icon = ICONS[id];
  return <Icon className={className} />;
}
