export interface IProviderAvailabilityMonth {
  providerId: string;
  month: number;
  year: number;
}

export type IResponseAvailabilityMonth = Array<{
  day: number;
  available: boolean;
}>;

export interface IProviderAvailabilityDay {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

export type IResponseAvailabilityDay = Array<{
  hour: number;
  available: boolean;
}>;
