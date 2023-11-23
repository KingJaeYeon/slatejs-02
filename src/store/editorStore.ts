import { create } from "zustand";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import { withHistory } from "@/components/slate-plugins/with-history";

type State = {
  editor: any;
  shift: boolean;
};
type Action = {
  setShift: (shift: boolean) => void;
  reset: () => void;
};

const initialState: State = {
  editor: withReact(withHistory(createEditor())),
  shift: false,
};

export const useEditorStore = create<State & Action>()((set, get) => ({
  editor: withReact(withHistory(createEditor())),
  shift: false,
  setShift: (shift: boolean) => set({ shift }),
  reset: () => set(initialState),
}));
