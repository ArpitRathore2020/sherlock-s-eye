import { createContext } from "react";

const ExpandedContext = createContext({
  expanded: false,
  setExpanded: () => {},
});

export default ExpandedContext;
