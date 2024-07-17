import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "Author min age" })
@Injectable()
class MinAuthorAgeValidator implements ValidatorConstraintInterface {
  validate(value: Date): Promise<boolean> | boolean {
    const date = value.getDate();
    const month = value.getMonth() - 1;
    const year = value.getFullYear() + 15;

    return new Date() >= new Date(year, month, date);
  }

  defaultMessage(): string {
    return "Author must be atleast 15 years old";
  }
}

export function MinAuthorAge(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "MinAuthorAge",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: MinAuthorAgeValidator,
    });
  };
}
