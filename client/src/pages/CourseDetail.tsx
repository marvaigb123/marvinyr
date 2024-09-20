import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  rating: number;
  time: string;
  price: number;
}

const CourseDetail = ({
  match,
  courses,
}: {
  match: any;
  courses: Course[];
}) => {
  const courseId = match.params.id;
  const course = courses.find((course) => course.id === parseInt(courseId));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Rating: {course.rating}</p>
      <p>Time: {course.time}</p>
      <p>Price: {course.price} USDC</p>
    </div>
  );
};

export default CourseDetail;
