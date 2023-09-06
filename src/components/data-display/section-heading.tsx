import { cn } from "@/lib/utils";
type Props = {
  textAccent?: string;
  text?: string;
  className?: string;
};
export default function SectionHeading({ textAccent, text, className }: Props) {
  return (
    <h2 className={cn("text-3xl font-semibold md:text-4xl", className)}>
      <span className="text-light-accent dark:text-dark-accent">
        {textAccent}
      </span>{" "}
      <span className="text-light-light dark:text-dark-light">{text}</span>
    </h2>
  );
}
