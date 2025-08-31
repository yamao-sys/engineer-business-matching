import { JSX, memo } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import BaseFormTextarea from "../BaseFormTextarea";

type Props<T extends FieldValues> = {
  id: string;
  label: string;
  control: Control<T>;
  name: Path<T>;
  validationErrors: string[];
} & JSX.IntrinsicElements["textarea"];

function BaseControlFormTextareaInner<T extends FieldValues>({ id, label, control, name, validationErrors, ...props }: Props<T>) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <BaseFormTextarea id={id} label={label} {...field} value={field.value ?? ""} validationErrorMessages={validationErrors} {...props} />
        )}
      />
    </>
  );
}

const BaseControlFormTextarea = memo(BaseControlFormTextareaInner) as typeof BaseControlFormTextareaInner;

export default BaseControlFormTextarea;
