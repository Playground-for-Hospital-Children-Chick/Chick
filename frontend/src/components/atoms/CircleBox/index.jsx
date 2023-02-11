function CircleBox({ children }) {
  return (
    <div
      className="container p-2 m-3 flex flex-col justify-evenly px-6 w-[150px] h-[150px] rounded-[100px] bg-white border border-black/75"
      style={{ boxShadow: "4px 4px 4px 3px rgba(0,0,0,0.25)" }}
    >
      {children}
    </div>
  );
}

export default CircleBox;