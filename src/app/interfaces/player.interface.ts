export type Classement = 'N1' | 'N2' | 'N3' | 'R4' | 'R5' | 'R6' | 'D7' | 'D8';
export interface Player {
  id: string;
  Sexe: string;
  Nom: string;
  Prenom: string;
  Licence: string;
  DateNaissance: string;
  TelContact: string;
  TelTuteur: string;
  SigleClub: string;
  Categorie: string;
  DateClassement: string;
  SimpleClassement: Classement;
  SimpleRang: string;
  SimpleCPPH: string;
  DoubleClassement: Classement;
  DoubleRang: string;
  DoubleCPPH: string;
  MixteClassement: Classement;
  MixteRang: string;
  MixteCPPH: string;
  IsChecked?: boolean;
  IsSingle?: boolean;
  IsDouble?: boolean;
  IsMixte?: boolean;
}
