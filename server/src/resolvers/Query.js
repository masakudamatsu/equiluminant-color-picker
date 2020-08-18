async function feed(parent, args, context, info) {
  const where = {
    AND: [
      {
        luminance: {
          gt: args.greaterThan,
        },
      },
      {
        luminance: {
          lt: args.lessThan,
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
