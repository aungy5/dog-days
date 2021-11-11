import React, { useEffect, useState } from 'react';

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

function BreedSearch() {
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        getDogs();

        async function getDogs() {
            const response = await fetch(`https://api.thedogapi.com/v1/breeds/?limit=30`, {
                method: "GET",
                headers: {"x-api-key" : "5881783a-3c1c-4a92-951e-f1166c1b84dc"}
            });
            const data = await response.json();
            setDogs(data);
        }

    }, []);

    return (
        <section className="dogs">
  
          <h1 style={titleStyle}>BREEDS</h1>
          {dogs.map((dog) => (
            <div className="row" key={dog.id} style={dogStyle}>
            <div className="col-sm-8">
              <div className="card text-center">
                <div className="card-header" style={titleStyle}> <h2>Breed Group: {dog.breed_group}</h2> </div>
                <div className="card-body">
                  <h3 className="card-title">Breed Name: {dog.name}</h3>
                  <img className="img1" src={dog.image.url}></img>
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
                </div>
                <div class="card-footer text-bold">Breed Traits: {dog.temperament}</div>
              </div>
            </div>
          </div>
          ))}
        </section>
      )
  };

  export default BreedSearch;