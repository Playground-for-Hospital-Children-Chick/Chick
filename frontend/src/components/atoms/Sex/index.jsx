function Sex({ register }) {
  return (
    <div
      className="text-center font-chick w-[5em]  relative overflow-hidden px-5 py-5 rounded-[30px] bg-yellow-200"
      style={{ boxShadow: "0px 1px 3px 0 rgba(0,0,0,0.45)" }}
    >
      <select {...register} className="text-xl bg-yellow-200">
        {["남", "여"].map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Sex;
