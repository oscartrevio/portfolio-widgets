import type React from "react";

import styles from "./styles.module.css";

const Preview = ({ children, codeblock }: React.HTMLAttributes<HTMLDivElement> & { codeblock?: string }) => (
  <figure data-with-codeblock={codeblock} className={styles.preview}>
    <div className="-z-10 pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(#d8d8d8,1px,transparent_1px)] [background-size:20px_20px]" />
    {children}
  </figure>
);

export default Preview;
