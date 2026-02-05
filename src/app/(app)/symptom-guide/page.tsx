import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SymptomForm } from './symptom-form';

export default function SymptomGuidePage() {
  return (
    <>
      <Header title="AI Symptom Guide" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Find the Right Specialist
            </CardTitle>
            <CardDescription>
              Describe your symptoms below, and our AI assistant will suggest
              the most appropriate medical department for you to consult. This
              is not a medical diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SymptomForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
