function HomePage() {
  return (
    <>
      <h1>Luminance Picker</h1>
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
      <p>Contrast ratio with pure black: 5.21</p>
    </>
  );
}

export default HomePage;
