import { CoursesList } from '@/features/courses-list/pub/courses-list';
import { CreateCourseForm } from '@/features/courses-list/pub/create-course-from';

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8">
      <CreateCourseForm revalidatePagePath='/' className='max-w-[300px]'/>
      <CoursesList revalidatePagePath='/' />
    </main>
  );
}
