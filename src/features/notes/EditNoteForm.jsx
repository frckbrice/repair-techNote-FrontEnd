import { useState, useEffect } from 'react';
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../config/roles';
import PropTypes from 'prop-types';


// challenge
import React from 'react'

const EditNoteForm = ({note, users}) => {

  const [updateNotes,{
    isLoading,
    isSuccess,
    isError,
    error 
  }] = useUpdateNoteMutation();

  const [deleteUser, {
    isError: isDelError, 
    isSuccess: isDelSuccess, 
    error: delerror,
  }] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if(isSuccess || isDelSuccess) {
      
    }
  },[])






















  return (
    <div>
      
    </div>
  )
}

export default EditNoteForm;
