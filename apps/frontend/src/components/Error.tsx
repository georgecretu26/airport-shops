type ErrorProps = {
  message: string;
  details?: string;
};

const Error = ({ message, details }: ErrorProps) => {
  return (
    <div className="text-center text-red-500">
      <p>{message}</p>
      {details && <pre className="text-xs mt-2">{details}</pre>}
    </div>
  );
};

export default Error;
