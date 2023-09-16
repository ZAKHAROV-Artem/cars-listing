import { cn } from "@/lib/utils";
import ContentLoader from "react-content-loader";

type Props = {
  className?: string;
};
export default function CarDetailSliderSkeleton({ className }: Props) {
  return (
    <ContentLoader
      className={cn(
        "mt-5  h-[200px] w-full xs:h-[300px] sm:h-[400px] md:h-[500px]",
        className,
      )}
      speed={2}
      viewBox="0 0 720 425"
      backgroundColor="#bdbdbd"
      foregroundColor="#f7f7f7"
    >
      <rect x="0" y="0" rx="10" ry="10" width="720" height="325" />
      <rect
        x="0"
        y="335"
        rx="10"
        ry="10"
        width="165"
        height="90"
        className="hidden lg:block"
      />
      <rect
        x="185"
        y="335"
        rx="10"
        ry="10"
        width="165"
        height="90"
        className="hidden lg:block"
      />
      <rect
        x="370"
        y="335"
        rx="10"
        ry="10"
        width="165"
        height="90"
        className="hidden lg:block"
      />
      <rect
        x="555"
        y="335"
        rx="10"
        ry="10"
        width="165"
        height="90"
        className="hidden lg:block"
      />
    </ContentLoader>
  );
}
