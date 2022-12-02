import { ISystemErrorSubstitution } from './systemerrorsubstitution';

export interface ISystemError {
  translationKey: string;
  translatedValue: string;
  substitutions?: Array<ISystemErrorSubstitution>;
}
