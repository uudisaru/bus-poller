import axios from "axios";
import { API_TALLINN_BUS_POSITIONS } from "../settings";
import { PositionUpdate, Tracker } from "./tracker";

export async function poll() {
  try {
    const response = await axios.get(API_TALLINN_BUS_POSITIONS);
    return response.data;
  } catch (error) {
    console.error(error);
  }

  return null;
}

function toDecimalDegrees(degrees: string) {
  return Number(degrees.substr(0, 2) + "." + degrees.substr(2));
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

function parseLine(line: string): PositionUpdate | null {
  if (!line) {
    return null;
  }

  const data = line.trim();
  if (!data) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, lineNo, lon, lat, _, tag, id] = data.split(",");
  return {
    coords: [toDecimalDegrees(lat), toDecimalDegrees(lon)],
    id,
    line: lineNo,
    type,
  };
}

/**
 * Parse Tallinn bus traffic feed
 * @param data bus traffic feed document, comma-separated csv
 */
export function parseUpdates(data: string): PositionUpdate[] {
  const lines = data.split("\n");
  return lines.map(parseLine).filter(notEmpty);
}

export class Poller {
  readonly tracker: Tracker;
  constructor() {
    this.tracker = new Tracker(parseUpdates);
  }

  public async poll() {
    const data = await poll();
    if (!!data) {
      return this.tracker.update(data);
    }

    return [];
  }
}
