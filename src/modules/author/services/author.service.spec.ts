import { Test } from "@nestjs/testing";
import { AuthorService } from "./author.service";
import { AuthorRepository } from "../repository/repositories/author.repository";
import { mockAuthorRepository } from "../__mock__/author-repository.mock";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { AuthorDto } from "../dto/autho.dto";
import { mockBookService } from "../../../modules/book/__mock__/book-service.mock";
import { BooksService } from "../../../modules/book/services/books.service";

describe("Author Service", () => {
  let authorService: AuthorService;
  let authorRepository: AuthorRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: AuthorRepository,
          useValue: mockAuthorRepository,
        },
        {
          provide: BooksService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    authorRepository = moduleRef.get<AuthorRepository>(AuthorRepository);
    authorService = moduleRef.get<AuthorService>(AuthorService);
  });

  it("should be define", () => {
    expect(authorService).toBeDefined();
  });

  it("should create an athor and return with id field", async () => {
    const author: CreateAuthorDto = {
      name: "author",
      birthdate: new Date(2000, 12, 14),
    };

    const createdAuthor = await authorService.create(author);

    expect(createdAuthor).toEqual({
      id: expect.any(String),
      ...createdAuthor,
    });

    expect(authorRepository.create).toHaveBeenCalledWith(author);
  });

  it("should return list of authors", async () => {
    const authors: AuthorDto[] = [
      {
        id: expect.any(String),
        name: expect.any(String),
        birthdate: expect.any(Date),
      },
    ];

    expect(await authorService.findAll()).toEqual(authors);
    expect(authorRepository.findAll).toHaveBeenCalled();
  });

  it("should return an specific author", async () => {
    const id = "669776b8230c041db91837ce";

    expect(await authorService.findById(id)).toEqual({
      id,
      name: expect.any(String),
      birthdate: expect.any(Date),
    });
    expect(authorRepository.findById).toHaveBeenCalledWith(id);
  });

  it("should delete and return deleted author", async () => {
    const id = "669776b8230c041db91837ce";

    expect(await authorService.deleteById(id)).toEqual({
      id,
      name: expect.any(String),
      birthdate: expect.any(Date),
    });
    expect(authorRepository.deleteById).toHaveBeenCalledWith(id);
  });

  it("should update and return updated author", async () => {
    const id = "669776b8230c041db91837ce";

    const updateAuthor = {
      name: "updated name",
      birthdate: new Date(2001, 12, 2),
    };

    expect(await authorService.updateById(id, updateAuthor)).toEqual({
      id,
      ...updateAuthor,
    });
    expect(authorRepository.updateById).toHaveBeenCalledWith(id, updateAuthor);
  });
});
