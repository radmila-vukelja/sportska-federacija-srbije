import { Location } from "./location";
import { SportType } from "./sport-type";
import { Player } from "./player";

export class Club {
    id: number;
    name: string;
    owner: string;
    contactEmail: string;
    numberOfMembers: number;
    playerList: Player[];
    sportType: SportType;
    location: Location;
}