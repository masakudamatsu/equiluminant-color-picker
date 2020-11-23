const axios = require("axios");
const cases = require("jest-in-case");

cases(
  "Query resolver returns colors as expected for:",
  async (opts) => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: `query {
          feed(contrastRatio: ${opts.contrastRatio}, chroma: ${opts.chroma}, orderBy: [{hue: asc}]) {
            red
            green
            blue
            contrast_ratio
            hue
            chroma
          }
        }`,
    });
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        feed: expect.arrayContaining(opts.sampleOfResults),
      },
    });
  },
  {
    "Contrast ratio 5.36 and chroma 125": {
      contrastRatio: 5.36,
      chroma: 125,
      sampleOfResults: [
        {
          red: 203,
          green: 97,
          blue: 78,
          contrast_ratio: 5.36,
          hue: 9,
          chroma: 125,
        },
        {
          red: 198,
          green: 101,
          blue: 73,
          contrast_ratio: 5.36,
          hue: 13,
          chroma: 125,
        },
        {
          red: 194,
          green: 104,
          blue: 69,
          contrast_ratio: 5.36,
          hue: 17,
          chroma: 125,
        },
        {
          red: 191,
          green: 106,
          blue: 66,
          contrast_ratio: 5.36,
          hue: 19,
          chroma: 125,
        },
        {
          red: 188,
          green: 108,
          blue: 63,
          contrast_ratio: 5.36,
          hue: 22,
          chroma: 125,
        },
      ],
    },
    "Contrast ratio 1.5 and chroma 25": {
      contrastRatio: 1.5,
      chroma: 25,
      sampleOfResults: [
        {
          red: 62,
          green: 37,
          blue: 43,
          contrast_ratio: 1.5,
          hue: 346,
          chroma: 25,
        },
        {
          red: 62,
          green: 37,
          blue: 42,
          contrast_ratio: 1.5,
          hue: 348,
          chroma: 25,
        },
        {
          red: 62,
          green: 37,
          blue: 41,
          contrast_ratio: 1.5,
          hue: 350,
          chroma: 25,
        },
        {
          red: 62,
          green: 37,
          blue: 40,
          contrast_ratio: 1.5,
          hue: 353,
          chroma: 25,
        },
        {
          red: 62,
          green: 37,
          blue: 39,
          contrast_ratio: 1.5,
          hue: 355,
          chroma: 25,
        },
      ],
    },
  }
);
