export interface Room {
  _id: string;
  room_name: string;
  room_description: string;
  price_per_night: number;
  room_type: string;
  photo: string;
  review?: number;
}