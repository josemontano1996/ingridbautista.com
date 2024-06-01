import { ZodError, z } from 'zod';
import {
  ITranslationDetails,
  TAllergen,
  
  zodAllergenType,
} from '../../shared/types/TAllergens';
import { ZodValidationError } from '@/application/errors/ValidationError';

export class ProductEntity {
  constructor(
    private _id: string | undefined,
    private image: string,
    private type: string,
    private price: number,
    private portion: string | undefined,
    private allergens: TAllergen[] | undefined,
    private en: ITranslationDetails,
    private es: ITranslationDetails,
    private fr: ITranslationDetails,
  ) {
    this._id = _id;
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
    return this._id;
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
  private validate() {
    const entitySchema = z.object({
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

    try {
      entitySchema.safeParse(this);
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  }
}
