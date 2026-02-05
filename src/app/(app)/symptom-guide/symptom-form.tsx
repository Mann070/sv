
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { getDepartmentSuggestion } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/context/LanguageContext';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('symptomGuide.form.submitButton.pending')}
        </>
      ) : (
        t('symptomGuide.form.submitButton.default')
      )}
    </Button>
  );
}

export function SymptomForm() {
  const [state, formAction] = useActionState(
    getDepartmentSuggestion,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (state.data) {
      formRef.current?.reset();
    }
  }, [state.data]);

  return (
    <div className="space-y-6">
      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="symptoms">{t('symptomGuide.form.label')}</Label>
          <Textarea
            name="symptoms"
            id="symptoms"
            placeholder={t('symptomGuide.form.placeholder')}
            rows={5}
            required
            minLength={10}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            {t('symptomGuide.form.infoNote')}
          </p>
          <SubmitButton />
        </div>
      </form>

      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t('common.error')}</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.data && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle className="font-headline text-xl">
                {t('symptomGuide.results.title')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-muted-foreground">
                {t('symptomGuide.results.suggestedDepartment')}
              </p>
              <p className="text-2xl font-bold text-primary">
                {state.data.suggestedDepartment}
              </p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">{t('symptomGuide.results.reasoning')}</p>
              <p className="text-foreground">{state.data.reasoning}</p>
            </div>
            <Separator />
            <div>
              <p className="font-semibold text-muted-foreground">
                {t('symptomGuide.results.careAdvice')}
              </p>
              <div
                className="prose prose-sm text-foreground max-w-none"
                dangerouslySetInnerHTML={{
                  __html: state.data.careAdvice
                    .replace(/\n/g, '<br />')
                    .replace(
                      /\d+\./g,
                      (match) => `<br /><strong>${match}</strong>`
                    ),
                }}
              />
            </div>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>{t('common.disclaimer')}</AlertTitle>
              <AlertDescription>
                {t('symptomGuide.results.disclaimer')}
              </AlertDescription>
            </Alert>
          </CardContent>
          {state.data.isDoctorVisitRecommended && (
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/appointments">
                  {t('symptomGuide.results.scheduleButton')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
