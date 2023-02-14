function CircleBox({ children, size }) {
  if (size == "small") {
    return (
      <div
        className="container m-3 flex flex-col justify-evenly w-[125px] h-[125px] rounded-[100px] bg-white border border-black/75 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
        style={{ boxShadow: "4px 4px 4px 3px rgba(0,0,0,0.25)" }}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div
        className="container p-2 m-3 flex flex-col justify-evenly px-6 w-[150px] h-[150px] rounded-[100px] bg-white border border-black/75 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150"
        style={{ boxShadow: "4px 4px 4px 3px rgba(0,0,0,0.25)" }}
      >
        {children}
      </div>
    );
  }
}

export default CircleBox;
