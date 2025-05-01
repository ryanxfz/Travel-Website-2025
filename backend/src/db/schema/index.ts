import * as destination from "./destination.schema";
import * as travel from "./travel.schema";
import * as travelDestination from "./travel_to_destination.schema";

export const databaseSchema = {
    ...destination,
    ...travel,
    ...travelDestination,
};