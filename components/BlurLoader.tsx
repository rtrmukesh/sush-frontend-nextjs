import { CSSProperties } from "react";
import Spinner from "./Spinner";

const BlurLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <Spinner name="ScaleLoader" color={"black"} />
    </div>
  );
};

const styles: { overlay: CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(8px)",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

// Add keyframes globally via style tag (only once in your app)
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default BlurLoader;
