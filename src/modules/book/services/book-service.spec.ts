import { Test, TestingModule } from "@nestjs/testing";
import { BookRepository } from "../repository/repositories/book.repository";
import { BooksService } from "./books.service";
import { mockBookRepository } from "../__mock__/book-repository.mock";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

describe("Book Service", () => {
  let bookService: BooksService;
  let bookRepository: BookRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: BookRepository, useValue: mockBookRepository },
      ],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    bookRepository = module.get<BookRepository>(BookRepository);
  });

  it("should be defined", () => {
    expect(bookService).toBeDefined();
  });

  it("should create a book and return it", async () => {
    const book: CreateBookDto = {
      title: "book title",
      authorId: "1234",
      publishedDate: new Date(),
    };

    const createdBook = await bookService.create(book);
    expect(createdBook).toEqual({ id: expect.any(String), ...book });
    expect(bookRepository.create).toHaveBeenCalledWith(book);
  });

  it("should retrive all books", async () => {
    const books = await bookService.findAll();
    expect(books).toEqual([
      {
        id: expect.any(String),
        title: expect.any(String),
        authorId: expect.any(String),
        publisheddate: expect.any(Date),
      },
    ]);
    expect(bookRepository.findAll).toHaveBeenCalled();
  });

  it("should return a specific book with id", async () => {
    const id = "1234";
    const book = await bookService.findById(id);
    expect(book).toEqual({
      id,
      title: expect.any(String),
      authorId: expect.any(String),
      publisheddate: expect.any(Date),
    });
    expect(bookRepository.findById).toHaveBeenCalledWith(id);
  });

  it("should update and return updated book", async () => {
    const id = "123";
    const book: UpdateBookDto = {
      title: "updated title",
    };
    const expectedValue = {
      id,
      title: expect.any(String),
      publisheddate: expect.any(Date),
      authorId: expect.any(String),
    };
    expect(await bookService.updateById(id, book)).toEqual(expectedValue);
    expect(bookRepository.updateById).toHaveBeenCalledWith(id, book);
  });

  it("should delete and return deleted book", async () => {
    const id = "123";
    const deleteBook = await bookService.deleteById(id);

    expect(deleteBook).toEqual({
      id,
      title: expect.any(String),
      publisheddate: expect.any(Date),
      authorId: expect.any(String),
    });
    expect(bookRepository.deleteById).toHaveBeenCalledWith(id);
  });

  it("should find an author books by authorId and return it", async () => {
    const authorId = "1234";
    const books = await bookService.findAuthorBooksByAuthorId(authorId);
    expect(books).toEqual([
      {
        authorId,
        title: expect.any(String),
        publisheddate: expect.any(Date),
        id: expect.any(String),
      },
    ]);
  });

  it("should find book within certain date range and return it", async () => {
    const dateDto = {
      from: new Date(2000, 12, 10),
      to: new Date(2010, 10, 12),
    };
    const books = await bookService.findBooksWithinCertainDateRage(dateDto);
    expect(books).toStrictEqual([]);
  });

  it("should delete books of an author by authorId", async () => {
    const id = "123";
    await bookService.deleteAuthorBooksByIAuthorId(id);
    expect(bookRepository.deleteBooksByAuthorId).toHaveBeenCalledWith(id);
  });
});
