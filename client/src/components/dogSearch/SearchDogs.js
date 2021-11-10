import React, { useState, useEffect } from 'react';
import {  Container, Form, Button, Card } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { saveDog, searchAPI } from '../../utils/API';
import { saveDogIds, getSavedDogIds } from '../../utils/localStorage';

const titleStyle = {
    backgroundColor: '#66ccff',
    padding: '20px'
  }
  
  const linkStyle = {
    color: '#66ccff',
  }
  
  const padding = {
    padding: '10px'
}


function SearchDogs() {
    const [searchedDogs, setSearchedDogs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedDogIds, setSavedDogIds] = useState(getSavedDogIds());

    useEffect(() => {
        return () => saveDogIds(savedDogIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchAPI(searchInput);

            if (!response.ok) {
                throw new Error("ERROR")
            }

            const { items } = await response.json();

            const dogData = items.map((dog) => ({
                dogId: dog.id,
                breedGroup: dog.breed_group,
                name: dog.name,
                bredFor: dog.bred_for,
                weight: dog.weight.imperial,
                height: dog.height.imperial,
                lifeSpan: dog.life_span,
                traits: dog.temperament
            }));

            setSearchedDogs(dogData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveDog = async (dogId) => {
        const dogToSave = searchedDogs.find((dog) => dog.dogId === dogId);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveDog(dogToSave, token);

            if (!response.ok) {
                throw new Error("ERROR")
            }

            setSavedDogIds([...savedDogIds, dogToSave.dogId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
      <div className="contact" style={padding}>
        <h1 style={titleStyle}>Search</h1>
        <Container>
          <h1>Search for Dogs!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a dog'
                />
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
            </Form.Row>
          </Form>
        </Container>
        

      <Container>
        <h2>
          {searchedDogs.length
            ? `Viewing ${searchedDogs.length} results:`
            : 'Search for a dog to begin'}
        </h2>
          {searchedDogs.map((dog) => (
            <Card key={dog.dogId} border='dark'>
            {dog.image ? (
              <Card.Img src={dog.image} alt={`The cover for ${dog.title}`} variant='top' />
            ) : null}
            <Card.Body>
              <Card.Title>{dog.title}</Card.Title>
              <p className='small'>Authors: {dog.authors}</p>
              <Card.Text>{dog.description}</Card.Text>
              {Auth.loggedIn() && (
                <Button
                  disabled={savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)}
                  className='btn-block btn-info'
                  onClick={() => handleSaveDog(dog.dogId)}>
                  {savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)
                    ? 'This dog has already been saved!'
                    : 'Save this Dog!'}
                </Button>
              )}
            </Card.Body>
          </Card>
          )
            
          )}
      </Container>
      </div>
    </>
    );
};

export default SearchDogs;