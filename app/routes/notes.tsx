import { redirect } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import { getStoredNotes, storeNotes } from "~/data/notes";
import type { Note } from "~/types/Note";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Notes" }];
};

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const note: Note = {
    id: new Date().toISOString(),
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  const existingNotes = await getStoredNotes();
  const updatedNotes = [...existingNotes, note];
  await storeNotes(updatedNotes);

  return redirect("/notes");
}

export function links() {
  return [...newNoteLinks()];
}
