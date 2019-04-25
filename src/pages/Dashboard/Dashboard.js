import React from "react";

export default function Dashboard({ match }) {

  let clearLocalStorage = () => {
    localStorage.clear();
    loadLocalStorage()
  }

  let loadLocalStorage = () => {
    let doggyDog = localStorage.getItem('doggyData')
    doggyDog = !doggyDog ? [] : JSON.parse(doggyDog)
    return doggyDog.map(dog => (
      <div
        className="card col-4"
        key={dog.url}
      >
        <img
          src={dog.url}
          className="card-img-top image"
          alt='A Cute Puppy'
        />
        <div className="card-body">
          <h2>You Rated this Dog:</h2>
          <h3 className="card-text">
            <span>{dog.rating}</span>
          </h3>
        </div>
      </div>
    ))
  }

  return (
    <div
      className='container'
    >
      <div className="row">
        <button
          className="btn btn-primary"
          onClick={clearLocalStorage}
        >Clear Saved</button>
      </div>
      <div className='row'>
        {loadLocalStorage()}
      </div>
    </div>
  );
}