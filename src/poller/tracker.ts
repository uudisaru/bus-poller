/**
 * Latitude/longitude coordinates in WGS-84 coordinate system.
 */
export type Coords = [number, number];

/**
 * Individual coordinate update for vehicle.
 */
export interface PositionUpdate {
  /**
   * Vehicle id
   */
  id: string;
  /**
   * Line no of the bus
   */
  line: string;
  /**
   * Current position
   */
  coords: Coords;
  type: string;
}

export type TrackParser = (data: string) => PositionUpdate[];

export class Tracker {
  readonly tracks: Map<string, PositionUpdate>;
  constructor(readonly parser: TrackParser) {
    this.tracks = new Map();
  }

  public update(data: string) {
    const locations = this.parser(data);
    const changes: PositionUpdate[] = [];
    for (const location of locations) {
      const track = this.tracks.get(location.id);
      if (!track) {
        this.tracks.set(location.id, location);
        changes.push(location);
      } else if (!this.coordsEqual(track.coords, location.coords)) {
        track.coords = location.coords;
        changes.push(track);
      }
    }

    return changes;
  }

  private coordsEqual(a: Coords, b: Coords) {
    return a[0] === b[0] && a[0] === b[0];
  };
}
