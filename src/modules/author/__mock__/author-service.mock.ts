export const mockAuthorService = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
  isExist: jest.fn().mockImplementation(() => Promise.resolve(true)),
};
