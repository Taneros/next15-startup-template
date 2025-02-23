'use-client';
import { Button } from '@/shared/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Course } from '@prisma/client';
import { useTransition } from 'react';

interface CourseItemProps {
  course: Course;
  onDelete: (id: string) => Promise<void>;
}

export const CourseItem = ({ course, onDelete }: CourseItemProps) => {
  const [isLoadingDelete, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    startDeleteTransition(async () => {
      await onDelete(course.id);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleDelete} disabled={isLoadingDelete}>
          {isLoadingDelete ? 'Deleting...' : 'Delete'}
        </Button>
      </CardFooter>
    </Card>
  );
};
