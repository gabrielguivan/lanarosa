import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  input, textarea {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--hover-color);
    }
  }
`;

const DashboardForm = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('file', images[i]);
    }

    try {
      const uploadRes = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const imageUrls = uploadRes.data.files;

      const productData = {
        name: productName,
        description,
        price: parseInt(price, 10) * 100, // Converte para centavos
        images: imageUrls,
      };

      await axios.post('/api/create-product', productData);
      toast.success('Produto criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar produto.');
      console.error('Erro ao criar produto:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Criar Produto</h2>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Nome do Produto"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preço (R$)"
          required
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          required
        />
        <button type="submit">Criar Produto</button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default DashboardForm;
