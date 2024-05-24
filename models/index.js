// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// module.exports = prisma;

// แบบย่อ
module.exports = new (require('@prisma/client').PrismaClient)();
