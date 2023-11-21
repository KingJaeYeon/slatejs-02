"use client";
export const CodeElement = (props: any): JSX.Element => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
