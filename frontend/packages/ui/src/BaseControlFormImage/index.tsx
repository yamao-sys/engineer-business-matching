"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Control, Controller, FieldValues, Path, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import BaseFlexCentralBox from "../BaseFlexCentralBox";

type Props<T extends FieldValues> = {
  id: string;
  label: string;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  name: Path<T>;
  validationErrors: string[];
};

function BaseControlFormImageInner<T extends FieldValues>({ id, label, control, name, setValue, watch, validationErrors }: Props<T>) {
  const [previewUrl, setPreviewUrl] = useState("");

  const onDrop = useCallback(
    (files: File[]) => {
      if (files.length === 0 || files[0] === undefined) {
        return;
      }
      // NOTE: ファイルをセットするが、FieldValuesのextendsで汎化しておりvalueの型がPathValueImplになるのでキャスト
      setValue(name, files[0] as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    [setValue, name],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

  const watchFile = watch(name);

  useEffect(() => {
    if (!watchFile) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result as string);
    fileReader.readAsDataURL(watchFile);
  }, [watchFile]);

  const clearFile = useCallback(() => {
    setValue(name, undefined as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    setPreviewUrl("");
  }, [setValue, name]);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
        <span className="font-bold">{label}</span>
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div className="flex flex-col">
              <div
                {...getRootProps()}
                className={`
                  relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50"}
                  ${validationErrors.length > 0 ? "border-red-300 bg-red-50" : ""}
                `}
              >
                <input {...getInputProps()} className="hidden" />

                {previewUrl ? (
                  <div className="space-y-3">
                    <img src={previewUrl} alt="プレビュー" className="mx-auto max-h-128 object-contain" />
                    <p className="text-sm text-gray-600">{field.value?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-gray-400">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {isDragActive ? "ファイルをドロップしてください" : "ファイルをドラッグ&ドロップ、またはクリックして選択"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ファイルクリアボタン */}
              {field.value && (
                <BaseFlexCentralBox>
                  <button
                    type="button"
                    className="mt-2 justify-center inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                    onClick={clearFile}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    削除
                  </button>
                </BaseFlexCentralBox>
              )}

              {/* バリデーションエラー */}
              {validationErrors.length > 0 && (
                <div className="mt-2 text-sm text-red-600">
                  {validationErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

const BaseControlFormImage = memo(BaseControlFormImageInner) as typeof BaseControlFormImageInner;

export default BaseControlFormImage;
