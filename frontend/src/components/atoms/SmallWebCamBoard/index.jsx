function SmallWebCamBoard({ children }) {
  return (
    <div className="grid grid-rows-4 mt-12 gap-0 w-[400px] h-[600px] overflow-hidden bg-[#133b60] rounded-[30px] place-items-center">
      {children}
    </div>
  );
}

export default SmallWebCamBoard;
