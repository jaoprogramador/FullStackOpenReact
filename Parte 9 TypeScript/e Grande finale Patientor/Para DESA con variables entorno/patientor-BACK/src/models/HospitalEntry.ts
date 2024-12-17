import { BaseEntry } from "./BaseEntry";
interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }
  