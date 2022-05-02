/**
 * markdown
 * 2021-2021
 * v 0.0.2
 * https:// guides.github.com/pdfs/markdown-cheatsheet-online.pdf
 * */

import React from "react";

export function MarkdownDesign({ className, node, title }) {
  if (node.frontmatter.title.includes(title) || title === undefined) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: node.html }}
      />
    );
  } else return null;
}
