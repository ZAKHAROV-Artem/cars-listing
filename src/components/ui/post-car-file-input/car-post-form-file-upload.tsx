import { InputHTMLAttributes } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../button";
import { useEffectOnce } from "usehooks-ts";
import FileItem from "./file-item";
import {
  DndContext,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragEndEvent,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { v4 } from "uuid";
import { cn } from "@/lib/utils";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setFiles: any;
  files: any[];
}
export default function CarPostFormFileUpload({
  disabled,
  setFiles,
  files,
  ...rest
}: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 6,
    disabled: files.length >= 6,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles) => {
      if (files.length + acceptedFiles.length >= 6) {
        acceptedFiles = acceptedFiles.slice(0, 6 - files.length);
      }
      setFiles((prev: any) => [
        ...(prev[0]?.hasOwnProperty("provider") ? [] : prev),
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: v4(),
          }),
        ),
      ]);
    },
  });
  useEffectOnce(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  });
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);
    if (active.id !== over?.id) {
      const oldIndex = files.findIndex((file) => file.id === active.id);
      const newIndex = files.findIndex((file) => file.id === over?.id);
      setFiles(arrayMove(files, oldIndex, newIndex));
    }
  };
  const handleRemove = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };
  return (
    <div>
      <div
        {...getRootProps({
          className: cn(
            `w-full min-h-[150px] p-5 cursor-pointer grid place-content-center bg-accent-light dark:bg-slate-800 rounded-3xl text-center outline-none`,
            {
              "cursor-not-allowed": files.length >= 6,
            },
          ),
        })}
      >
        {files.length >= 6 ? (
          <>
            {" "}
            <div className="">Max files to upload - 6</div>
          </>
        ) : (
          <>
            <input {...getInputProps({ ...rest })} />

            <div className="">Drag and drop here or click to select files</div>
            <div className="mt-3">
              <Button>Browse files</Button>
            </div>
          </>
        )}
      </div>
      {!!files.length && (
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <SortableContext items={files} strategy={rectSortingStrategy}>
              {files.map((file, i) => (
                <FileItem
                  key={file.id}
                  file={file}
                  orderIndex={i}
                  remove={handleRemove}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
