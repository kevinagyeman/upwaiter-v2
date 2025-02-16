'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  LocationFormSchema,
  locationFormSchema,
} from '@/schemas/location-schema';
import {
  getCantons,
  getDistrictsInCanton,
  getMunicipalitiesInDistrict,
} from '@/services/location.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useLocationStore } from '@/store/location';
import { set } from 'date-fns';

export default function LocationForm() {
  const { setLocation } = useLocationStore();
  const [cantons, setCantons] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [municipalities, setMunicipalities] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCantons();
        setCantons(data);
      } catch (error) {
        console.log('errore regioni:', error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<LocationFormSchema>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      isoCode: 'CH',
      country: 'Switzerland',
      canton: '',
      district: '',
      municipality: '',
    },
  });

  const handleCantonChange = async (e: any) => {
    const canton = cantons.find((c) => c.name === e.valueOf());
    if (!canton) return;
    form.setValue('canton', canton.name);
    form.setValue('district', '');
    form.setValue('municipality', '');
    setLocation(form.getValues());
    try {
      const data = await getDistrictsInCanton(canton.key);
      setDistricts(data);
    } catch (error) {
      console.log('Errore nel caricamento delle province:', error);
    }
  };

  const handleDistrictChange = async (e: any) => {
    const district = districts.find((d) => d.name === e.valueOf());
    if (!district) return;
    form.setValue('district', district.name);
    form.setValue('municipality', '');
    setLocation(form.getValues());
    try {
      const data = await getMunicipalitiesInDistrict(district.key);
      setMunicipalities(data);
    } catch (error) {
      console.log('Errore nel caricamento delle province:', error);
    }
  };

  const handleMunicipalityChange = (e: any) => {
    form.setValue('municipality', e.valueOf());
    setLocation(form.getValues());
  };

  const publishJobPost: SubmitHandler<LocationFormSchema> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log('Errore durante la creazione del jobpost:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <Form {...form}>
          <div
            onSubmit={form.handleSubmit(publishJobPost)}
            className='space-y-2  max-w-sm w-full'
          >
            <div>
              <p className='text-muted-foreground'>Location</p>
            </div>

            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={field.name} {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='canton'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e: string) => {
                        handleCantonChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selezione un cantone' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {cantons.map((canton: any, index: number) => (
                            <SelectItem key={index} value={canton.name}>
                              {canton.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='district'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e: string) => {
                        handleDistrictChange(e);
                      }}
                      defaultValue={field.value}
                      disabled={!form.getValues('canton')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selezione un distretto' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {districts.map((district: any, index: number) => (
                            <SelectItem key={index} value={district.name}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='municipality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(e: string) => {
                        handleMunicipalityChange(e);
                      }}
                      disabled={!form.getValues('district')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selezione un comune' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {municipalities.map(
                            (municipality: any, index: number) => (
                              <SelectItem key={index} value={municipality.name}>
                                {municipality.name}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button
              role='submit'
              disabled={form.formState.isSubmitting}
              className='w-full'
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : (
                'Pubblica annuncio'
              )}
            </Button> */}
          </div>
        </Form>
      </div>
    </>
  );
}
