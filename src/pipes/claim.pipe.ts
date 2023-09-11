import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Claims } from 'src/config/claims';

export function ClaimValidation(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'ClaimValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: string[], args: ValidationArguments) {
          const servicerClaims: string[] = Object.values(Claims)
          const result = value.some((item) => servicerClaims.includes(item))          
          return result;
        },
        defaultMessage(args: ValidationArguments) {
          return `Error in claims name.`;
        },
      },
    });
  };
}
