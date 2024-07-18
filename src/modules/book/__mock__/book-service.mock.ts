export const mockBookService = {
  deleteAuthorBooksByIAuthorId: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
};
