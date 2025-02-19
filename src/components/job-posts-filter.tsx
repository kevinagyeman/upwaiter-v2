import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import LocationForm from './location-form';
import { useLocationStore } from '@/store/location';
import { useRouter } from 'next/navigation';

export function JobPostsFilter() {
  const { location } = useLocationStore();
  const router = useRouter();
  const filter = () => {
    router.push(
      `?canton=${location?.canton}&?district=${location?.district}&municipality=${location?.municipality}`
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'secondary'}>
          Filtra <SlidersHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filta gli annunci</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <LocationForm />
        <Button onClick={filter}>Cerca annunci</Button>
        <Button onClick={() => router.push('/')} variant={'ghost'}>
          Reset Filter
        </Button>
      </SheetContent>
    </Sheet>
  );
}
