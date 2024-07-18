import { Test } from "@nestjs/testing";
import { BooksService } from "../../book/services/books.service";
import { mockBookService } from "../../book/__mock__/book-service.mock";
import { BooksController } from "./books.controller";
import { AuthorService } from "../../author/services/author.service";
import { mockAuthorService } from "../../author/__mock__/author-service.mock";
import { CreateBookDto } from "../dto/create-book.dto";

describe("Books Controller", () => {
  let bookService: BooksService;
  let bookController: BooksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBookService,
        },
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    bookController = module.get<BooksController>(BooksController);
    bookService = module.get<BooksService>(BooksService);
  });

  it("should be defined", () => {
    expect(bookController).toBeDefined();
  });

  it("should bookcontroller call bookservice create method with correct arguments", async () => {
    const book: CreateBookDto = {
      title: "book title",
      publishedDate: new Date(),
      authorId: "123",
    };

    await bookController.create(book);
    expect(bookService.create).toHaveBeenCalledWith(book);
  });

  it("should bookcontroller call book service findAll method", async () => {
    await bookController.getAllBooks({ page: 1, limit: 10 });
    expect(bookService.findAll).toHaveBeenCalled();
  });

  it("should bookcontroller call bookservice findById method with id", async () => {
    const id = "12345";
    await bookController.getBookById(id);
    expect(bookService.findById).toHaveBeenCalledWith(id);
  });

  it("should bookcontroller call bookservice updateById method with correct arguments", async () => {
    const id = "12345";
    const book = {
      title: "updated title",
    };
    await bookController.updateBookById(id, book);
    expect(bookService.updateById).toHaveBeenCalledWith(id, book);
  });

  it("should bookcontroller call bookservice deleteById with id", async () => {
    const id = "12345";
    await bookController.deleteBookById(id);
    expect(bookService.deleteById).toHaveBeenCalledWith(id);
  });
});
