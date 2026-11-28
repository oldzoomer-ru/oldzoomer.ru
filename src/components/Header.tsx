import './Header.css';

interface HeaderProps {
  fullName: string;
}

export default function Header({ fullName }: HeaderProps) {
  return (
    <header className="adwaita-header-bar">
      <h1 className="adwaita-window-title">{fullName}</h1>
      <div className="adwaita-window-controls" />
    </header>
  );
}
