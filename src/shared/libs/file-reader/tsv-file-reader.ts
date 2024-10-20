import { readFileSync } from 'node:fs';

import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.type.js';
import { FileReader } from './file-reader.interface.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { User } from '../../types/user.type.js';
import { Coordinates } from '../../types/coordinates.type.js';
import { Comfort } from '../../types/comfort.enum.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private fileName: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('Data is not valid');
    }
  }

  private parseLineToCity(line: string): City {
    return { id: line };
  }

  private parseLineToPhotos(line: string): string[] {
    return line.split(';');
  }

  private parseLineToComforts(line: string): Comfort[] {
    return line.split(';').map((part) => Comfort[part as Comfort]);
  }

  private parseUser(firstName: string, lastName: string, email: string, avatarPath: string): User {
    return { firstName, lastName, email, avatarPath };
  }

  private parseLineToCoordinates(line: string): Coordinates {
    const [lat, long] = line.split(';');
    return { latitude: Number.parseFloat(lat), longitude: Number.parseFloat(long) };
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      publicationTime,
      city,
      previewPic,
      photos,
      isPremium,
      isBookmarked,
      rating,
      type,
      rooms,
      guests,
      price,
      comforts,
      firstName,
      lastName,
      userEmail,
      avatarPath,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      publicationTime,
      city: this.parseLineToCity(city),
      previewPic,
      photos: this.parseLineToPhotos(photos),
      isPremium: isPremium.toLowerCase() === 'true',
      isBookmarked: isBookmarked.toLowerCase() === 'true',
      rating: Number.parseFloat(rating),
      type: OfferType[type as OfferType],
      rooms: Number.parseInt(rooms, 10),
      guests: Number.parseInt(guests, 10),
      price: Number.parseFloat(price),
      comforts: this.parseLineToComforts(comforts),
      user: this.parseUser(firstName, lastName, userEmail, avatarPath),
      coordinates: this.parseLineToCoordinates(coordinates),
    };
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData.split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
