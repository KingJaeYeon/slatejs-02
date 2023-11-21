"use client";
import React, { useState } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

function Editor(props) {
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <Slate editor={editor} value initialValue={initialValue}>
      <Editable />
    </Slate>
  );
}

export default Editor;
