'use client';

import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui/select';
import { Textarea } from '@/presentation/components/ui/textarea';
import { Checkbox } from '@/presentation/components/ui/checkbox';
import { allergensArray } from '@/shared/consts/allergens';
import { capitalize } from '@/shared/utils/capitalize';
import { FormButton } from '@/presentation/components/custom/FormButton';
import { createProductAction } from '@/application/actions/product-actions';
import { imageToBase64String } from '@/shared/utils/imageToBase64String';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { useParams, useRouter } from 'next/navigation';
import { isFile } from '@/shared/utils/isFile';
import { ProductCategoryDto } from '@/application/dto/ProductCategoryDto';
import { zodAllergenType } from '@/shared/types/TAllergens';
import { ProductDto } from '@/application/dto/ProductDto';

const createProductFormSchema = z.object({
  image: z.any(),
  type: z.string(),
  price: z.coerce
    .number()
    .min(0.1, { message: 'Minimo 0.1' })
    .transform((val) => Number(val.toFixed(2))),
  portion: z.string().optional(),
  allergens: z.array(zodAllergenType).optional(),
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

const NewProductForm = ({
  categories,
}: {
  categories: ProductCategoryDto[];
}) => {
  const router = useRouter();
  const { locale } = useParams();

  const setErrorStatusStore = useStatusStore((state) => state.setError);

  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    '',
  );

  const form = useForm<z.infer<typeof createProductFormSchema>>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      image: '',
      type: '',
      price: 0,
      portion: '',
      allergens: [],
      es: {
        name: '',
        description: '',
      },
      en: {
        name: '',
        description: '',
      },
      fr: {
        name: '',
        description: '',
      },
    },
  });

  const setImagePreview = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(new Blob([file]));
    reader.onloadend = () => {
      const parsedFile = reader.result;

      setPreviewImage(parsedFile);
    };
  };

  const onSubmit = async (values: z.infer<typeof createProductFormSchema>) => {
    console.log(values);
    if (isFile(values.image)) {
      values.image = await imageToBase64String(values.image);
    } else {
      return setErrorStatusStore('Formato de imagen no válido');
    }

    const { success, message } = await createProductAction(
      values as ProductDto,
    );

    if (!success) {
      return setErrorStatusStore(message ? message : 'Error al crear producto');
    }

    const successMessage = encodeURI('Producto creado correctamente');
    router.push(`/${locale}/admin/menu?success=${successMessage}`);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <div className="mt-4 flex h-[150px] items-center gap-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Imagen</FormLabel>
                  <FormControl>
                    <Input
                      accept=".jpg, .jpeg, .png, .webp"
                      type="file"
                      name="image"
                      onChange={(e) => {
                        setImagePreview(e);
                        return field.onChange(
                          e.target.files ? e.target.files[0] : null,
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {previewImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewImage.toString()}
                alt="Preview image"
                className="h-full"
              />
            ) : null}
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="text-lg">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo de plato" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat.id}
                        value={cat.name}
                        className="text-lg"
                      >
                        {capitalize(cat.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Precio</FormLabel>
                <FormControl className="text-lg">
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Precio por {`(opcional)`}
                </FormLabel>
                <FormControl className="text-lg">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="allergens"
            render={({}) => (
              <FormItem>
                <div>
                  <FormLabel className="text-lg">
                    Alergenos {`(opcional)`}
                  </FormLabel>
                  <FormDescription>Elige los alergenos</FormDescription>
                </div>
                <div className="flex flex-wrap items-start gap-8">
                  {allergensArray.map((allergen) => (
                    <FormField
                      key={allergen}
                      control={form.control}
                      name="allergens"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={allergen}
                            className="flex items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(allergen)}
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value!,
                                        allergen,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: any) => value !== allergen,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-lg">
                              {capitalize(allergen)}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-semibold">Traducciones</h2>
          <div className="space-y-2">
            <h3 className="text-2xl">Español</h3>
            <FormField
              control={form.control}
              name="es.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Nombre del plato</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="es.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Descripción del plato
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl">Francés</h3>
            <FormField
              control={form.control}
              name="fr.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Nombre del plato</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fr.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Descripción del plato
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl">Inglés</h3>
            <FormField
              control={form.control}
              name="en.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Nombre del plato</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="en.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">
                    Descripción del plato
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="text-lg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormButton form={form} text="Submit" loadingText="Submitting..." />
      </form>
    </Form>
  );
};

export default NewProductForm;
