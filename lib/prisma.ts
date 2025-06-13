// Mock Prisma client for development without database
const mockPrisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  course: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  student: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  instructor: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  assignment: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  liveClass: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  $transaction: async (queries: any[]) => queries.map(() => ({})),
};

export const prisma = mockPrisma; 