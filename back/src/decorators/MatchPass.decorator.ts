import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPass implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Passwords do not match';
  }
}
