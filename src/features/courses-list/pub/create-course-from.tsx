'use client';

import { createCourseAction } from '@/features/courses-list/actions';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { cn } from '@/shared/ui/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createCourseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

interface ICreateCourseFormProps {
  className: string;
  revalidatePagePath: string;
}

export const CreateCourseForm = ({className, revalidatePagePath }: ICreateCourseFormProps) => {
  const [isCreateTransition, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          startCreateTransition(async () => {
            createCourseAction(data, revalidatePagePath);
          });
        })}
        className={cn(className, "space-y-8")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Название - 222 " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea placeholder="Описание" {...field}></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreateTransition}>Добавить</Button>
      </form>
    </Form>
  );
};
