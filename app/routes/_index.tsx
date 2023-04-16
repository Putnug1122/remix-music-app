import { Link, type V2_MetaFunction } from "@remix-run/react";
import styles from "~/styles/home.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Music App" }];
};

export default function Index() {
  return (
    <main id="content">
      <h1>A better way to keeping track of your notes</h1>
      <p>Try out early beta and neve loose track of your favourite artist</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
