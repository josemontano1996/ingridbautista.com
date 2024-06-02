import { ZodError, z } from 'zod';
import {
  ITranslationDetails,
  TAllergen,
  zodAllergenType,
} from '../../shared/types/TAllergens';
import { ProductDto } from '@/application/dto/ProductDto';
import { ZodValidationError } from '@/application/errors/Errors';

export interface IProductEntity {
  getId(): string | undefined;
  getImage(): string;
  getType(): string;
  getPrice(): number;
  getPortion(): string | undefined;
  getAllergens(): TAllergen[] | undefined;
  getEn(): ITranslationDetails;
  getEs(): ITranslationDetails;
  getFr(): ITranslationDetails;
  toProductDto(): ProductDto;
}

export class ProductEntity implements IProductEntity {
  constructor(
    private id: string | undefined,
    private image: string,
    private type: string,
    private price: number,
    private portion: string | undefined,
    private allergens: TAllergen[] | undefined,
    private en: ITranslationDetails,
    private es: ITranslationDetails,
    private fr: ITranslationDetails,
  ) {
    this.id = id?.toString();
    this.image = image;
    this.type = type;
    this.price = price;
    this.portion = portion;
    this.allergens = allergens;
    this.en = en;
    this.es = es;
    this.fr = fr;

    this.validate();
  }
  getId(): string | undefined {
    return this.id;
  }

  getImage(): string {
    return this.image;
  }

  getType(): string {
    return this.type;
  }
  getPrice(): number {
    return this.price;
  }

  getPortion(): string | undefined {
    return this.portion;
  }

  getAllergens(): TAllergen[] | undefined {
    return this.allergens;
  }

  getEn(): ITranslationDetails {
    return this.en;
  }

  getEs(): ITranslationDetails {
    return this.es;
  }

  getFr(): ITranslationDetails {
    return this.fr;
  }

  toProductDto(): ProductDto {
    return {
      id: this.getId(),
      image: this.getImage(),
      type: this.getType(),
      price: this.getPrice(),
      portion: this.getPortion(),
      allergens: this.getAllergens(),
      en: this.getEn(),
      es: this.getEs(),
      fr: this.getFr(),
    };
  }
  private validate() {
    try {
      productEntitySchema.safeParse(this);
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  }
}

export const productEntitySchema = z.object({
  id: z.string().optional(),
  image: z.string(),
  type: z.string().optional(),
  price: z.number().min(0),
  portion: z.string().optional(),
  allergens: zodAllergenType.optional(),
  en: z.object({
    name: z.string(),
    description: z.string(),
  }),
  es: z.object({
    name: z.string(),
    description: z.string(),
  }),
  fr: z.object({
    name: z.string(),
    description: z.string(),
  }),
});
