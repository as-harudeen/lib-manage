import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "IsValidPublishedDate" })
@Injectable()
class PublishedDateValidator implements ValidatorConstraintInterface {
  validate(value: Date): boolean {
    const date = value.getDate();
    const month = value.getMonth();
    const year = value.getFullYear();

    return new Date() > new Date(year, month, date);
  }

  defaultMessage(): string {
    return "Publish date  can't be future date";
  }
}
export const IsValidPublishDate = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "IsValidPublishedDate",
      propertyName,
      target: object.constructor,
      options: validationOptions,
      validator: PublishedDateValidator,
    });
  };
};
