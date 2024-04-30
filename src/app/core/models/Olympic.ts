import { Participation } from "./Participation";

/*
Representation of an olympic country

example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export interface Olympic {
  id: number;
  county: string;
  participations: Participation[];
}
