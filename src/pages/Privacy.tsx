import { meta } from '@/data/pages';
import { privacyPolicy } from '@/data/legal';
import LegalLayout from '@/components/sections/LegalLayout';

export default function PrivacyPage() {
  return <LegalLayout doc={privacyPolicy} meta={meta.privacy} />;
}
