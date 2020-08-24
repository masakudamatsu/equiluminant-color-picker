function InputRGB() {
  return (
    <form>
      <label htmlFor="red">
        R:
        <input
          type="text"
          id="red"
          inputMode="decimal"
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
        />
      </label>
      <label htmlFor="green">
        G:
        <input
          type="text"
          id="green"
          inputMode="decimal"
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
        />
      </label>
      <label htmlFor="blue">
        B:
        <input
          type="text"
          id="blue"
          inputMode="decimal"
          pattern="1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]"
        />
      </label>
    </form>
  );
}

export default InputRGB;