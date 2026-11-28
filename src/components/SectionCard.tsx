import MarkdownRenderer from './MarkdownRenderer';
import './SectionCard.css';
import { SectionItem } from '../types/github';

interface SectionCardProps {
  items: SectionItem[];
}

export default function SectionCard({ items }: SectionCardProps) {
  return (
    <div className="adwaita-card">
      {items.map((item, index) => (
        <div key={index} className="adwaita-row">
          <div className="adwaita-row-content">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="adwaita-row-title">
                {item.title}
              </a>
            ) : (
              <h3 className="adwaita-row-title">{item.title}</h3>
            )}

            {item.subtitle && (
              <div className="adwaita-row-subtitle">{item.subtitle}</div>
            )}

            {item.description && (
              <div className="adwaita-row-description">
                {item.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                ) : (
                  <MarkdownRenderer content={item.description} />
                )}
              </div>
            )}

            {item.highlights && item.highlights.length > 0 && (
              <ul className="adwaita-row-highlights">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
