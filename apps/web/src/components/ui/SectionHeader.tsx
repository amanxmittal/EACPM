import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeader({
  eyebrow,
  title,
  children,
  href,
  linkLabel = "View all",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-head">
      <div className="sh-copy">
        {eyebrow && <span className="kicker">{eyebrow}</span>}
        <h2 className="t-h2 balance">{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {href && (
        <Link href={href} className="link-arrow">
          {linkLabel}
          <Icon name="arrowRight" size={18} />
        </Link>
      )}
    </div>
  );
}
