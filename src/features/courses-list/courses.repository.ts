import { CourseListElement, CreateCourseListElementCommand, DeleteCourseListElementCommand } from '@/features/courses-list/model/types';
import { dbClient } from '@/shared/lib/db';
import { cache } from 'react';

class CoursesRepository {
  public getCoursesList = cache(async (): Promise<CourseListElement[]> => {
    try {
      return await dbClient.course.findMany();
    } catch (error) {
      throw new Error(`Failed to fetch courses: ${error}`);
    }
  });

  public createCourseElement = async (
    course: CreateCourseListElementCommand
  ): Promise<CourseListElement> => {
    try {
      return await this.addCourse(course);
    } catch (error) {
      throw new Error(`Failed to create course: ${error}`);
    }
  };

  public deleteCourseElement = async (
    course: DeleteCourseListElementCommand
  ): Promise<CourseListElement> => {
    try {
      return await this.removeCourse(course);
    } catch (error) {
      throw new Error(`Failed to delete course: ${error}`);
    }
  };

  private addCourse = async (
    course: CreateCourseListElementCommand
  ): Promise<CourseListElement> => {
    return await dbClient.course.create({
      data: {
        name: course.name,
        description: course.description,
      },
    });
  };

  private removeCourse = async (
    course: DeleteCourseListElementCommand
  ): Promise<CourseListElement> => {
    return await dbClient.course.delete({
      where: { id: course.id },
    });
  };
}

export const coursesRepository = new CoursesRepository();
