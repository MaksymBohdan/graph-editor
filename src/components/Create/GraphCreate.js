/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
/* COMPONENTS */
import { GraphListContext } from '../../context/graphListContext';
/* OTHERS*/
import { Title, Input, Select, Button } from './GraphCreateStyled';

const GraphCreate = () => {
  const { saveNewGraph, currentGraph, editGraph, graphs } = useContext(
    GraphListContext
  );
  const { register, handleSubmit, reset, setValue } = useForm();

  //EDIT
  const isEditable = currentGraph.id;

  useEffect(() => {
    setValue([{ name: currentGraph.name }, { edge: currentGraph.edge }]);
  }, [isEditable]);

  //  SUBMIT
  const onSubmit = (data) => {
    if (isEditable) {
      editGraph(currentGraph.id, data);

      return;
    } else {
      saveNewGraph({ ...data });
    }

    reset();
  };

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

export default GraphCreate;
