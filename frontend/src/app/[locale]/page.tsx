import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Index() {
  const t = useTranslations('homePage');
  return <Button>{t('title')}</Button>;
}
