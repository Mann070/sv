import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PolicyForm } from './policy-form';

export default function GovernmentPoliciesPage() {
  return (
    <>
      <Header title="Government Policies" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Check Your Policy Eligibility
            </CardTitle>
            <CardDescription>
              Fill in your details to find out which government health and
              welfare policies you may be eligible for. This tool provides
              guidance and is not a final determination.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PolicyForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
