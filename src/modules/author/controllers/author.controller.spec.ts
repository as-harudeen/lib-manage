import { Test } from "@nestjs/testing";
import { AuthorService } from "../services/author.service";
import { AuthorController } from "./author.controller";

const mockAuthorService = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe("Author Controller", () => {
  let authorService: AuthorService;
  let authorController: AuthorController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    authorController = module.get<AuthorController>(AuthorController);
    authorService = module.get<AuthorService>(AuthorService);
  });

  it("should be defined", () => {
    expect(authorService).toBeDefined();
  });

  it("should call author service create method with correct arguments", async () => {
    const author = {
      name: "author",
      birthdate: new Date(),
    };

    await authorController.create(author);
    expect(authorService.create).toHaveBeenCalledWith(author);
  });

  it("should call author service findAll method", async () => {
    await authorController.getAllAuthors();
    expect(authorService.findAll).toHaveBeenCalled();
  });

  it("should call author service findById method with id", async () => {
    const id = "12345";
    await authorController.getAuthorById(id);
    expect(authorService.findById).toHaveBeenCalledWith(id);
  });

  it("should call author service updateById method with correct arguments", async () => {
    const id = "12345";
    const author = {
      name: "author",
      birthdate: new Date(),
    };
    await authorController.updateAuthorById(id, author);
    expect(authorService.updateById).toHaveBeenCalledWith(id, author);
  });

  it("should call author service deleteById with id", async () => {
    const id = "12345";
    await authorController.deleteAuthorById(id);
    expect(authorService.deleteById).toHaveBeenCalledWith(id);
  });
});
