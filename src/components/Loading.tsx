interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading GitHub data...' }: LoadingProps) {
  return (
    <div className="loading">
      {message}
    </div>
  );
}
