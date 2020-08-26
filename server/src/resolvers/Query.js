async function feed(parent, args, context, info) {
  const where = {
    AND: [
      { hue: args.hue },
      {
        contrast_ratio: {
          gt: args.contrastRatio - 0.005,
        },
      },
      {
        contrast_ratio: {
          lt: args.contrastRatio + 0.005,
        },
      },
    ],
  };

  const colors = await context.prisma.rgbColorCodes.findMany({
    where,
  });

  return colors;
}

module.exports = {
  feed,
};
