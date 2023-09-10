import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function RegValidation(regex: RegExp, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'RegValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [regex],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [regex] = args.constraints;
          return regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `The ${args.property} does not match the pattern.`;
        },
      },
    });
  };
}
