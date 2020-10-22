async function feed(parent, args, context, info) {
  const where = {
    AND: [
      {
        chroma: args.chroma,
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
