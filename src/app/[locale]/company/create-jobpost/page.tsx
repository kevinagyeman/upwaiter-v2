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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { jobPostFormSchema, JobPostFormSchema } from '@/schemas/jobpost-schema';
import { createJobPost } from '@/services/jobpost.services';
import {
  getComuniInProvince,
  getProvincesInRegion,
  getRegions,
} from '@/services/localization';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function CreateJobPost() {
  const app = useStackApp();
  const [regions, setRegions] = useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [provinces, setProvinces] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [comunes, setComunes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegions();
        setRegions(data);
      } catch (error) {
        console.log('errore regioni:', error);
      }
    };
    fetchData();
  }, []);

  const form = useForm<JobPostFormSchema>({
    resolver: zodResolver(jobPostFormSchema),
    defaultValues: {
      title: '',
      description: '',
      country: 'Italia',
      region: '',
      province: '',
    },
  });

  const handleRegionChange = async (e: any) => {
    const region = e.valueOf();
    form.setValue('region', region);
    try {
      const data = await getProvincesInRegion(region);
      setProvinces(data);
    } catch (error) {
      console.log('Errore nel caricamento delle province:', error);
    }
  };

  const handleProvinceChange = async (e: any) => {
    const province = e.valueOf();
    form.setValue('province', province);
    try {
      const data = await getComuniInProvince(province);
      setComunes(data);
    } catch (error) {
      console.log('Errore nel caricamento delle province:', error);
    }
  };

  const publishJobPost: SubmitHandler<JobPostFormSchema> = async (data) => {
    try {
      const user = await app.getUser();
      if (user) {
        await createJobPost({
          companyId: user.id,
          title: data.title,
          description: data.description,
        });
      }
      form.reset();
    } catch (error) {
      console.log('Errore durante la creazione del jobpost:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(publishJobPost)}
            className='space-y-2  max-w-sm w-full'
          >
            <div>
              <h1 className=' text-2xl font-semibold'>
                Crea annuncio di lavoro
              </h1>
              <p className='text-muted-foreground'>crea annuncio di lavoro</p>
            </div>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name='region'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e: string) => {
                        handleRegionChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selezione una regione' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {regions.map((region: string, index: number) => (
                            <SelectItem key={index} value={region}>
                              {region}
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
              name='province'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e: string) => {
                        handleProvinceChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger disabled={!form.getValues('region')}>
                        <SelectValue placeholder='Selezione una provincia' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {provinces.map((province: any, index: number) => (
                            <SelectItem key={index} value={province.nome}>
                              {province.nome}
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
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={field.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              role='submit'
              disabled={form.formState.isSubmitting}
              className='w-full'
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : (
                'Pubblica annuncio'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
