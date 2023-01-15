import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

type ViewerProps = { content: string };

function MarkdownViewer({ content }: ViewerProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkUnwrapImages]}
      children={content}
    />
  );
}

export default React.memo(MarkdownViewer);
