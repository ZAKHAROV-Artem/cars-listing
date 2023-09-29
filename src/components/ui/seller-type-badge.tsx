import { cn } from "@/lib/utils";

type Props = {
  type: string;
  slug: string;
  className?: string;
};

export default function SellerTypeBadge({ type, slug, className }: Props) {
  return (
    <div
      className={cn(
        "w-fit p-2 text-white",
        {
          "bg-green-400": slug === "dealership",
          "bg-primary-light": slug === "broker",
          "bg-blue-500": slug === "private",
          "bg-orange-400": slug === "importer-exporter",
        },
        className,
      )}
    >
      {type}
    </div>
  );
}
