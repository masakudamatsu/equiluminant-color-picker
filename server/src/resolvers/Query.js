async function feed(parent, args, context, info) {
  const where = {
    AND: [
      {
        contrast_ratio: {
          gt: args.contrastRatio - 0.001,
        },
      },
      {
        contrast_ratio: {
          lt: args.contrastRatio + 0.001,
        },
      },
    ],
  };

  const colors = await context.prisma.rgbColorCodesSmall.findMany({
    where,
    orderBy: args.orderBy,
  });

  return colors;
}

module.exports = {
  feed,
};
