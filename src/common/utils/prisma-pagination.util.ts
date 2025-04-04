export interface PaginateOptions {
  page?: number;
  limit?: number;
  where?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
  include?: Record<string, unknown>;
}

export async function paginate<T>(
  model: {
    findMany: (options: {
      where: Record<string, unknown>;
      skip: number;
      take: number;
      orderBy: Record<string, unknown>;
      include: Record<string, unknown>;
    }) => Promise<T[]>;
    count: (options: { where: Record<string, unknown> }) => Promise<number>;
  },
  options: PaginateOptions,
): Promise<{
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}> {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      where: options.where ?? {},
      skip,
      take: limit,
      orderBy: options.orderBy ?? {},
      include: options.include ?? {},
    }),
    model.count({
      where: options.where ?? {},
    }),
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / limit),
    page,
    limit,
  };
}
