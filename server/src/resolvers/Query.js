async function feed(parent, args, context, info) {
  const where = {
    contrast_ratio: args.contrastRatio,
  };

  const colors = await context.prisma.rgbColorCodesSmall.findMany({
    where,
  });

  return colors;
}

module.exports = {
  feed,
};
