function WebCamBoard({ children }) {
  return (
    <div className="relative grid grid-cols-2 gap-0 w-[1194px] h-[699px] overflow-hidden bg-[#133b60]">
      {children}
    </div>
  );
}

export default WebCamBoard;
