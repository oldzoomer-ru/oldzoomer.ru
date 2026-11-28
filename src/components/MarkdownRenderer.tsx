import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import './MarkdownRenderer.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-renderer">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
          p: ({ children }) => <p className="md-p">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="md-link">
              {children}
            </a>
          ),
          code: ({ children }) => <code className="md-code">{children}</code>,
          pre: ({ children }) => <pre className="md-pre">{children}</pre>,
          ul: ({ children }) => <ul className="md-ul">{children}</ul>,
          ol: ({ children }) => <ol className="md-ol">{children}</ol>,
          li: ({ children }) => <li className="md-li">{children}</li>,
          blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
          img: ({ src, alt }) => (
            <img src={src} alt={alt} className="md-img" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
