import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { AUTHOR_MIN_AGE } from "../constants/author.constant";

@ValidatorConstraint({ name: "MinAuthorAge" })
@Injectable()
class MinAuthorAgeValidator implements ValidatorConstraintInterface {
  validate(value: Date): Promise<boolean> | boolean {
    if (!value) return false;
    const date = value.getDate();
    const month = value.getMonth() - 1;
    const year = value.getFullYear() + AUTHOR_MIN_AGE;
    return new Date() >= new Date(year, month, date);
  }

  defaultMessage(): string {
    return `Author must be atleast ${AUTHOR_MIN_AGE} years old`;
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
