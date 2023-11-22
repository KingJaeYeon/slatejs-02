import { create, StateCreator } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";

type State = {
  editor: any;
};
type Action = {
  reset: () => void;
};

const initialState: State = {
  editor: withReact(createEditor()),
};

export interface EditorSlice extends State, Action {}

export const useEditorStore = create<State & Action>()((set, get) => ({
  editor: withReact(createEditor()),
  reset: () => set(initialState),
}));
