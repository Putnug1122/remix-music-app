import { redirect } from "@remix-run/node";
import { useLoaderData, type V2_MetaFunction } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import type { Note } from "~/types/Note";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Notes" }];
};

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  if (!formData.get("title") || !formData.get("content")) {
    return { message: "Title and content are required" };
  }

  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (title.length < 5 || content.length < 5) {
    return { message: "Title and Content must be more than 5 characters" };
  }

  const note: Note = {
    id: new Date().toISOString(),
    title: title,
    content: content,
  };

  const existingNotes = await getStoredNotes();
  const updatedNotes = [...existingNotes, note];
  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
