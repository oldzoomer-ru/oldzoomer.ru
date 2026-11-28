import SectionCard from './SectionCard';
import './Sections.css';
import { SectionItem } from '../types/github';

interface SectionsProps {
  title: string;
  items: SectionItem[];
}

export default function Sections({ title, items }: SectionsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="adwaita-pref-group">
      <h2 className="adwaita-pref-group-title">{title}</h2>
      <SectionCard items={items} />
    </div>
  );
}
