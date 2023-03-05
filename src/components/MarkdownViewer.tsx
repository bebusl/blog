import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
type ViewerProps = { content: string };

function MarkdownViewer({ content }: ViewerProps) {
  console.log("content", content);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkUnwrapImages]}
      rehypePlugins={[rehypeSlug]}
      children={content}
    />
  );
}

export default React.memo(MarkdownViewer);
