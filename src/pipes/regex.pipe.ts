import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'regexValidation', async: false })
export class RegexValidation implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const [regex, nameVar] = args.constraints;
    return regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const [regex, nameVar] = args.constraints;
    return `Incorrectly entered data for ${nameVar}`;
  }
}

export function IsRegexMatch(regex: RegExp, nameVar: string) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [regex, nameVar],
      validator: RegexValidation,
    });
  };
}
