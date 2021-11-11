import React, { useState, useEffect } from 'react';

import Auth from '../utils/auth';
import { saveDog, searchAPI } from '../utils/API';
import { saveDogIds, getSavedDogIds } from '../utils/localStorage';

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
  
  const errorStyle = {
    backgroundColor: 'black',
    color: '#66ccff'
}

const dogStyle = {
    padding: "20px",
    backgroundColor: '#212429',
    justifyContent: 'Center'
};


//export default function DogSearch() {
const DogSearch = () => {
    const [searchedDogs, setSearchedDogs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedDogIds, setSavedDogIds] = useState(getSavedDogIds());

    useEffect(() => {
        return () => saveDogIds(savedDogIds);
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(searchInput)

        if (!searchInput) {
            return false;
        }

        try {
            // const response = await searchAPI(searchInput);
            // console.log(response.json())

            // if (!response.ok) {
            //     throw new Error("ERROR")
            // }

            // const { items } = await response.json();

            // const dogData = items.map((dog) => ({
            //     dogId: dog.id,
            //     breedGroup: dog.breed_group,
            //     name: dog.name,
            //     bredFor: dog.bred_for,
            //     weight: dog.weight.imperial,
            //     height: dog.height.imperial,
            //     lifeSpan: dog.life_span,
            //     traits: dog.temperament
            // }));

            const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${searchInput}`, {
                method: "GET",
                headers: {"x-api-key" : "5881783a-3c1c-4a92-951e-f1166c1b84dc"}
            });

            const dogData = await response.json();
            console.log(dogData);

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
        <section className="">
        <div className="contact" style={padding}>
        <h1 style={titleStyle}>SEARCH</h1>
        <form onSubmit={handleFormSubmit}>
        
        <div className="form-group" style={padding}>
            <label htmlFor="breed">Search for Breeds Below!</label>
            <br></br>
            <input 
            type="text" 
            className="form-input" 
            name="searchInput" 
            value={searchInput}
            placeholder="Search for dogs..." 
            onChange= {(e) => setSearchInput(e.target.value)}
            />
            <br></br>
        <button className="btn btn-dark" style={linkStyle}>Search</button>
        </div>

        </form>

        </div>

        <div className="results">

        <h2 style={titleStyle}>
          {searchedDogs.length
            ? `Viewing ${searchedDogs.length} results:`
            : 'Search for a dog to begin'}
        </h2>

        {searchedDogs.map((dog) => (
            <div className="row" key={dog.id} style={dogStyle}>
            <div className="col-sm-8">
              <div className="card text-center">
                <div className="card-header" style={titleStyle}> <h2>{dog.name}</h2> </div>
                <div className="card-body">
                  <h3 className="card-title">Breed Group: {dog.breed_group}</h3>
                  {/* <img className="img1" src={dog.image.url}></img> */}
                  <p className="card-text">
                    Bred For: {dog.bred_for}
                    <br></br>
                    Weight Range: {dog.weight.imperial}
                    <br></br>
                    Height Range: {dog.height.imperial}
                    <br></br>
                    Life Span: {dog.life_span}
                    
                  </p>
                  {/* <a href="XXXX" className="btn btn-dark" style={linkStyle}>
                    Learn More About This Breed
                  </a>
                  <br></br>
                  <br></br>
                  <a href="ADD ROUTE HERE" className="btn btn-dark" style={linkStyle}>
                    Save Dog
                  </a> */}
                  {Auth.loggedIn() && (
                    <button className="btn btn-dark"
                    disabled={savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)}
                    onClick={() => handleSaveDog(dog.dogId)} style={linkStyle}>
                    {savedDogIds?.some((savedDogId) => savedDogId === dog.dogId)
                    ? 'This dog has already been saved!'
                    : 'Save this Dog!'}
                    </button>
                  )}
                  
                </div>
                <div className="card-footer text-bold">Breed Traits: {dog.temperament}</div>
              </div>
            </div>
          </div>
        ))}

        </div>
        </section>

        
    );
    //export default DogSearch;
};

export default DogSearch;