const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-gray-300 text-center p-4 mt-8 fixed bottom-0 left-0">
      <p className="text-sm">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
