import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Project ID: {id}</h2>
      <p>Here you can add chat, files, etc.</p>
    </div>
  );
}

export default ProjectDetails;
