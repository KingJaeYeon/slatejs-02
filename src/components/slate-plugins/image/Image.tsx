import { ReactEditor, useFocused, useSelected } from "slate-react";
import { ElementProps } from "@/components/v2/change-element";
import { cn } from "@/lib/utils";
import { Transforms } from "slate";
import { Button } from "@/components/button";
import { useEditorStore } from "@/store/editorStore";

export const Image = ({ attributes, children, element }: ElementProps) => {
  const { editor } = useEditorStore((state) => state);
  const path = ReactEditor.findPath(editor, element);
  const selected = useSelected();
  const focused = useFocused();
  const boxShadow = selected && focused ? `shadow-[0_0_0_3px_#B4D5FF]` : `none`;
  const display = selected ? `inline` : `hidden`;

  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className={`relative flex justify-center`}>
        <img
          src={element.url}
          className={cn(`box-border block max-w-[95%]`, boxShadow)}
          alt={`insert`}
        />
        <Button
          // active
          onclickHandler={() => Transforms.removeNodes(editor, { at: path })}
          className={cn(
            `absolute bottom-0 flex justify-center bg-white`,
            display,
          )}
        >
          {/*<Icon>delete</Icon>*/}
          <div>delete</div>
        </Button>
      </div>
    </div>
  );
};
