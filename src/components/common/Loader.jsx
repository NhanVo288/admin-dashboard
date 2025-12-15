import { LoaderIcon } from "lucide-react";

function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
      }}
    >
      <LoaderIcon size={40} className="animate-spin" />
    </div>
  );
}

export default Loader;
