import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import s from "./header.module.css";

export function SiteHeader() {
  return (
    <header className={s.header}>
      <TopBar />
      <MainNav />
    </header>
  );
}
