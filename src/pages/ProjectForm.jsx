import { useState } from 'react';
//import { collection, addDoc } from 'firebase/firestore';
//import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
//import { db, storage } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fileURL = '';
    if (file) {
      const storageRef = ref(storage, `docs/${file.name}`);
      await uploadBytes(storageRef, file);
      fileURL = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, 'projects'), {
      title,
      description,
      fileURL,
      createdAt: new Date()
    });

    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Project</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} required />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProjectForm;
