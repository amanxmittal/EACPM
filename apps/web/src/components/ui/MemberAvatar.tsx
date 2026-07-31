import { initials, type Member } from "@/content/team";

// The vendor's own .ux4g-avatar img rule (border-radius: inherit; object-fit:
// cover) already clips a photo into the circle — no extra CSS needed. Falls
// back to the initials-on-gradient avatar when no photo is on file yet.
export function MemberAvatar({ member }: { member: Member }) {
  if (member.imageUrl) {
    return (
      <span className="ux4g-avatar avatar-gradient" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={member.imageUrl} alt="" />
      </span>
    );
  }
  return (
    <span className="ux4g-avatar avatar-gradient" aria-hidden>
      {initials(member.name)}
    </span>
  );
}
