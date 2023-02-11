function SmallWebCamBoard({ children }) {
  return (
    <div className="grid grid-rows-4 gap-0 w-[400px] h-[800px] overflow-hidden bg-[#133b60] rounded-[30px] place-items-center mt-3">
      {children}
    </div>
  );
}

export default SmallWebCamBoard;
