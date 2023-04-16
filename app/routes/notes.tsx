import type { V2_MetaFunction } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";

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

export function links() {
  return [...newNoteLinks()];
}
