import { memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BaseFlexCentralBox = memo(function BaseFlexCentralBox({ children }: Props) {
  return (
    <>
      <div className="flex justify-center">{children}</div>
    </>
  );
});

export default BaseFlexCentralBox;
