export default function CoursePage({ params }: any) {
  const id = params.id;
  return (
    <div>
      <h1>Course Page for id: {id}</h1>
    </div>
  );
}
