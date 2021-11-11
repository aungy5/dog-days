import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SAVE_DOG } from '../../utils/mutations';

import Auth from '../../utils/auth';

import '../../App.css'

const linkStyle = {
  color: "#66ccff",
};

const titleStyle = {
  backgroundColor: "#66ccff",
  padding: "20px",
};

const dogStyle = {
  padding: "20px",
  backgroundColor: '#212429',
  justifyContent: 'Center'
};

const imgStyle = {
  height: "300px",
  width: "500px",
};

const SaveDog = ({ dogId }) => {
    const [saveDog, { error }] = useMutation(SAVE_DOG)

    const handleSaveDog = async (event) => {
        event.preventDefault();

        try {
            const { data } = await saveDog({
                variables: {
                    dogId,
                    username: Auth.getProfile().data.username,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
    <section className="dogs">
        <button onClick={handleSaveDog}
        className="btn btn-dark" style={linkStyle}>
            Save Dog
        </button>
    </section>
    )
}

export default SaveDog;