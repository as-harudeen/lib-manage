import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "DateRangeValidator" })
@Injectable()
class DateRangeValidator implements ValidatorConstraintInterface {
  validate(
    _value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const object = validationArguments.object as { to: Date; from: Date };
    return object.from < object.to;
  }

  defaultMessage(): string {
    return "From date must be less than To date";
  }
}

export const IsValidDateRage = (validationOptions?: ValidationOptions) => {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "IsValidDateRage",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: DateRangeValidator,
    });
  };
};
