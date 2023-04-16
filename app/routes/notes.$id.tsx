import { Link } from "@remix-run/react";
import style from "~/styles/note-details.css";

export default function NoteDetailPage() {
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>Note TITLE</h1>
        <p id="note-details-content">NOTE CONTENT</p>
      </header>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
