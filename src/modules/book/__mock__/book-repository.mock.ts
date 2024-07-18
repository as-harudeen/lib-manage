import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

export const mockBookRepository = {
  create: jest.fn().mockImplementation(async (createBookDto: CreateBookDto) => {
    return {
      id: "669776b8230c041db91837ce",
      ...createBookDto,
    };
  }),
  findById: jest.fn().mockImplementation(async (id: string) => {
    const book = {
      title: "book title",
      authorId: "669776b8230c041db91837ce",
      publisheddate: new Date(),
    };
    return {
      id,
      ...book,
    };
  }),
  findAll: jest.fn().mockImplementation(async () => {
    const books = [
      {
        id: "669776b8230c041db91837ce",
        title: "book title",
        authorId: "669776b8230c041db91837ce",
        publisheddate: new Date(),
      },
    ];
    return books;
  }),
  updateById: jest
    .fn()
    .mockImplementation(async (id: string, updateBookDto: UpdateBookDto) => {
      return {
        id,
        title: "book title",
        authorId: "669776b8230c041db91837ce",
        publisheddate: new Date(),
        ...updateBookDto,
      };
    }),
  deleteById: jest.fn().mockImplementation(async (id: string) => {
    return {
      id,
      title: "book title",
      authorId: "669776b8230c041db91837ce",
      publisheddate: new Date(),
    };
  }),
  findBooksByAuthorId: jest
    .fn()
    .mockImplementationOnce(async (authorId: string) => {
      const books = [
        {
          id: "669776b8230c041db91837ce",
          title: "book title",
          authorId,
          publisheddate: new Date(),
        },
      ];

      return books;
    }),
  findBooksWithinDates: jest.fn().mockImplementation(async () => {
    return [];
  }),
  deleteBooksByAuthorId: jest.fn().mockImplementationOnce(() => Promise<void>),
};
