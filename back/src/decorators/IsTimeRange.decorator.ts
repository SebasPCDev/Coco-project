import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsTimeRange(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isTimeRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          if (!value.match(timeRegex)) {
            return false;
          }
          const [hours, minutes] = value.split(':').map(Number);
          if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `El campo ${args.property} debe ser una hora válida en formato HH:mm y estar en el rango de 00:00 a 23:59`;
        },
      },
    });
  };
}
