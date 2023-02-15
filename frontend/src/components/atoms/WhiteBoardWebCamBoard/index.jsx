function WhiteBoardWebCamBoard({ children }) {
  return (
    <div className="grid grid-rows-4 gap-0 w-[220px] h-screen overflow-hidden bg-[#133b60] rounded-[30px] place-items-center">
      {children}
    </div>
  );
}

export default WhiteBoardWebCamBoard;
