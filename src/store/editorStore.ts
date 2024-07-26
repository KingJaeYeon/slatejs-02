import { create } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";

type State = {
  editor: any;
  shift: boolean;
};
type Action = {
  setShift: (shift: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  editor: withReact(createEditor()),
  shift: false,
};

export const useEditorStore = create<State & Action>()((set, get) => ({
  editor: withReact(createEditor()),
  shift: false,
  setShift: (shift: boolean) => set({ shift }),
  reset: () => set(initialState),
}));
