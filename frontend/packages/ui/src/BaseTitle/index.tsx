import { memo } from "react";

type Props = {
  title: string;
};

const BaseTitle = memo(function BaseTitle({ title }: Props) {
  return (
    <>
      <h3 className="mt-16 w-full text-center text-2xl font-bold">{title}</h3>
    </>
  );
});

export default BaseTitle;
