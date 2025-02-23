import { coursesRepository } from '@/features/courses-list/courses.repository';
import { CourseItem } from '@/features/courses-list/ui/course-item';
import { revalidatePath } from 'next/cache';

interface ICourseListProps {
  revalidatePagePath: string;
}

export const CoursesList = async ({ revalidatePagePath }: ICourseListProps) => {
  const courseList = await coursesRepository.getCoursesList();

  const handleDeleteAction = async (courseId: string) => {
    'use-server';
    await coursesRepository.deleteCourseElement({ id: courseId });

    revalidatePath(revalidatePagePath);
  };

  return (
    <div className="flex flex-col gap-3">
      {courseList.length > 0 ? (
        courseList.map((course) => (
          <CourseItem key={course.id} course={course} onDelete={handleDeleteAction.bind(null, course.id)} />
        ))
      ) : (
        <div>No courses available</div>
      )}
    </div>
  );
};
