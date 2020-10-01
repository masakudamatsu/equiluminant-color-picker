async function feed(parent, args, context, info) {
  const where = {
    AND: [
      {
        hue: {
          gte: args.hue - 14,
        },
      },
      {
        hue: {
          lte: args.hue + 15,
        },
      },
      {
        contrast_ratio: args.contrastRatio,
      },
    ],
  };

  const colors = await context.prisma.rgbColorCodes.findMany({
    where,
    orderBy: args.orderBy,
  });

  return colors;
}

module.exports = {
  feed,
};
