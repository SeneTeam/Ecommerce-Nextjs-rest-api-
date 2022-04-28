import React from "react";
import $ from "jquery";

function Wrapper({ children }) {
  if (typeof window !== "undefined") {
    window.$ = window.jQuery = $;
    return <>{children}</>;
  }
  return "";
}

export default Wrapper;
