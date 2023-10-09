"use client";

import { FileWithPreview } from "@/types/other";
import Image from "next/image";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn, reduceString } from "@/lib/utils";
import { AiOutlineClose } from "react-icons/ai";
import { RiDraggable } from "react-icons/ri";
type Props = {
  file: FileWithPreview;
  orderIndex: number;
  remove: (id: string) => void;
};
export default function FileItem({ file, orderIndex, remove }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={cn(
        "relative cursor-auto select-none rounded-2xl bg-accent-light p-3 dark:bg-slate-800",
        {
          "z-10": isDragging,
        },
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div
        {...listeners}
        className="mb-3 flex w-full cursor-grab items-center justify-center rounded-xl bg-white dark:bg-default-dark"
      >
        <RiDraggable className="rotate-90" size={30} />
      </div>
      <Image
        width={300}
        height={300}
        className="max-h-[200px] w-full rounded-xl object-cover"
        src={file.preview}
        alt={file.name}
      />
      <div className="mt-3">
        <div className="break-all">{reduceString(file.name, 40)}</div>
      </div>
      <div className="absolute left-[-10px] top-[-10px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary-main text-white">
        {orderIndex + 1}
      </div>
      <div
        className="absolute left-[-10px] top-[20px] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary-main text-white  hover:cursor-pointer"
        onClick={() => remove(file.id)}
      >
        <AiOutlineClose size={20} />
      </div>
    </div>
  );
}
