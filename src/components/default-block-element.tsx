"use client";
export const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};
