import { Location } from "./location";
import { SportType } from "./sport-type";

export class Club {
    id: number;
    name: string;
    owner: string;
    contactEmail: string;
    numberOfMembers: number;
    sportType: SportType;
    location: Location;
}

