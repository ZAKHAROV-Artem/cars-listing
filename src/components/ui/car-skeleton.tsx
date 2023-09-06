import ContentLoader from "react-content-loader";

export default function CarSkeleton() {
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 200 220"
      backgroundColor="#bdbdbd"
      foregroundColor="#f7f7f7"
    >
      <rect x="0" y="0" rx="10" ry="10" width="200" height="125" />
      <rect x="0" y="130" rx="10" ry="10" width="146" height="23" />
      <rect x="2" y="169" rx="5" ry="5" width="100" height="9" />
      <rect x="2" y="183" rx="5" ry="5" width="140" height="9" />
      <rect x="3" y="209" rx="5" ry="5" width="50" height="9" />
    </ContentLoader>
  );
}
