import React, { useEffect } from "react";

const PreventBrowserNavigation = ({ children }) => {
  useEffect(() => {
    const handlePopstate = (event) => {
      // Prevent browser navigation
      window.history.pushState(null, null, window.location.href);
    };

    // Add event listener to prevent browser navigation
    window.addEventListener("popstate", handlePopstate);

    return () => {
      // Clean up by removing the event listener
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return <div>{children}</div>;
};

export default PreventBrowserNavigation;
