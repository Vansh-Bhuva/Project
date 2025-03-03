const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center space-x-2">
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>

      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-800"></div>

      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-1200"></div>
    </div>
  );
};

export default Spinner;
