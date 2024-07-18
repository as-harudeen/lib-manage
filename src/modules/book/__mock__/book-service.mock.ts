export const mockBookService = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
  deleteAuthorBooksByIAuthorId: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
};
