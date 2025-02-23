import { dbClient } from '@/shared/lib/db';
import { Button } from '@/shared/ui/button';

export default async function Home() {
  const courses = await dbClient.course.findMany();

  console.log('courses', courses);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <Button>Click me</Button>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.name} - {course.description}
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}
