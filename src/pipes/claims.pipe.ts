import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Claims } from 'src/config/claims';

export function IsValidClaim(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidClaim',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value)) {
            return false;
          }

          const invalidClaims = value.filter((claim) => !Object.values(Claims).includes(claim));
          return invalidClaims.length === 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `Invalid claims`;
        },
      },
    });
  };
}
