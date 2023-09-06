import { useEffect } from "react";

// Custom hook to handle key press events
const useKeyPress = (targetKey: string, callback: () => void) => {
  useEffect(() => {
    // Event handler function for key press
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    // Add event listener on mount
    window.addEventListener("keydown", handleKeyPress);

    // Remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;
