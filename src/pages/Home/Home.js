import React, { useState, useEffect } from "react";
import axios from 'axios'

let appStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh"
}
export default function Home() {

  useEffect(() => {
    getBreedTypes()
    getNewImage()
  }, [])

  // Setting URL For doggy image
  const [imgSrc, setImgSrc] = useState('')
  // Get new doggy image
  let getNewImage = () => {
    let url = 'https://dog.ceo/api/breeds/image/random'
    // If user chose a specific breed, alter url
    if (breedChoice) {
      url = `https://dog.ceo/api/breed/${breedChoice}/images/random`
    }
    // Pull data and setState
    axios.get(url)
      .then(function (response) {
        setImgSrc(response.data.message)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [breedTypes, setBreedTypes] = useState([])
  // Pull breed data and print to page
  let getBreedTypes = () => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(function (response) {
        // Parse response into array of dog breeds
        let breedArray = []
        // Loop through object
        for (let breed in response.data.message) {
          // Each key is a dog breed
          // If key has array property, this means this particular breed has many sub-breeds
          if (response.data.message[breed].length > 0) {
            for (let subBreed of response.data.message[breed]) {
              breedArray.push(`${breed}-${subBreed}`)
            }
          }
          else {
            breedArray.push(breed)
          }
        }
        setBreedTypes(breedArray);
      })
      .catch(function (error) {
        console.log(error);
        return <div>An Error Occured</div>
      });
  }

  // State for user input
  const [userChoice, setUserChoice] = useState(10)
  let handleUserInput = e => {
    setUserChoice(e.target.value)
  }

  const [breedChoice, setBreedChoice] = useState('')
  let handleBreedChange = e => {
    setBreedChoice(e.target.value)
  }

  // If a new breed is chosen, bring in new image
  useEffect(() => {
    getNewImage()
  }, [breedChoice])

  // Handle submit button
  let submitRating = () => {
    // Load localStorage first
    let doggyDog = localStorage.getItem('doggyData')
    // Handling when localStorage is empty
    doggyDog = !doggyDog ? [] : JSON.parse(doggyDog)
    // Save to local storage the doggy url and rating
    localStorage.setItem('doggyData', JSON.stringify([...doggyDog, { url: imgSrc, rating: userChoice }]));
    getNewImage()
  }


  return (
    <div
      style={appStyles}
    >
      <img src={imgSrc} alt={'A Cute Puppy'} />

      <h2>Rate this Puppy!</h2>
      <select
        onChange={handleBreedChange}
        value={breedChoice}
      >
        <option value=''>All</option>
        {breedTypes.map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <label htmlFor='rating'>Between 10-16</label>
      <input
        type='number'
        min='10'
        max='16'
        name='rating'
        value={userChoice}
        onChange={handleUserInput}
      />
      <button
        className="btn btn-primary"
        onClick={submitRating}
      >Submit</button>

      <button
        className="btn btn-primary"
        onClick={getNewImage}
      >New Puppy</button>

    </div>
  );
}