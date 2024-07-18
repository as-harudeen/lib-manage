import { AuthorDto } from "../dto/autho.dto";
import { CreateAuthorDto } from "../dto/create-author.dto";
import { UpdateAuthorDto } from "../dto/update-author.dto";

export const mockRepository = {
  create: jest
    .fn()
    .mockImplementation(async (createAuthorDto: CreateAuthorDto) => {
      return {
        id: "669776b8230c041db91837ce",
        ...createAuthorDto,
      };
    }),
  findAll: jest.fn().mockImplementation(async () => {
    return [
      {
        id: "669776b8230c041db91837ce",
        name: "author",
        birthdate: new Date(2000, 12, 14),
      },
    ] as AuthorDto[];
  }),
  findById: jest.fn().mockImplementation(async (id: string) => {
    return {
      id,
      name: "author",
      birthdate: new Date(2000, 12, 14),
    };
  }),
  deleteById: jest.fn().mockImplementation(async (id: string) => {
    return {
      id,
      name: "author",
      birthdate: new Date(2000, 12, 14),
    };
  }),
  updateById: jest
    .fn()
    .mockImplementation(
      async (id: string, updateAuthorDto: UpdateAuthorDto) => {
        return {
          id,
          ...updateAuthorDto,
        };
      },
    ),
};
