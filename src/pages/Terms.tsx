import { meta } from '@/data/pages';
import { termsAndConditions } from '@/data/legal';
import LegalLayout from '@/components/sections/LegalLayout';

export default function TermsPage() {
  return <LegalLayout doc={termsAndConditions} meta={meta.terms} />;
}
