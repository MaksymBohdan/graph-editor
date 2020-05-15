/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { GraphListContext } from '../context/graphListContext';

const GraphCreate = () => {
  const { saveNewGraph, currentGraph, editGraph, graphs } = useContext(
    GraphListContext
  );
  const { register, handleSubmit, reset, setValue } = useForm();
  const isEditable = currentGraph.id;

  const onSubmit = (data) => {
    if (isEditable) {
      editGraph(currentGraph.id, data);
      return;
    } else {
      saveNewGraph(data);
    }

    reset();
  };

  useEffect(() => {
    setValue([{ name: currentGraph.name }, { edge: currentGraph.edge }]);
  }, [isEditable]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title>Manage</Title>
      <Input name="name" placeholder="Name" ref={register} type="text" />
      <Select name="edge" placeholder="Edges" ref={register}>
        <option value="">No connection...</option>
        {graphs
          .filter(
            (graph) =>
              graph.id !== currentGraph.id && graph.edge !== currentGraph.id
          )
          .map((graph) => (
            <option key={graph.id} value={graph.id}>
              {graph.name}
            </option>
          ))}
      </Select>
      <Button type="submit">{isEditable ? 'Edit' : 'Save'} </Button>
      <Button type="reset" onClick={reset}>
        Clear
      </Button>
    </form>
  );
};

const Title = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
`;

const Input = styled.input`
  display: block;
  margin: auto;
  width: 200px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  display: block;
  margin: auto;
  width: 200px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  display: block;
  margin: auto;
  width: 200px;
`;

export default GraphCreate;
