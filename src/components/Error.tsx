interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <div className="error">
      <p>Error: {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Retry
        </button>
      )}
    </div>
  );
}
