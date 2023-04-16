import { json } from "@remix-run/node";
import { Link, type V2_MetaFunction, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import style from "~/styles/note-details.css";

export const meta: V2_MetaFunction = ({ data }) => {
  return [{ title: data.title }];
};

export default function NoteDetailPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
        <p id="note-details-content">{note.content}</p>
      </header>
    </main>
  );
}

export async function loader({ params }: { params: { id: string } }) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note) => note.id === params.id);

  if (!selectedNote) {
    throw json({ message: "Note not found" }, { status: 404 });
  }
  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: style }];
}
