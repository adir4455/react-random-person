import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    const { password } = person.login;
    const { first, last } = person.name;
    const { age } = person.dob;
    const { number, name } = person.location.street;

    const newPerson = {
      image,
      phone,
      email,
      age,
      password,
      name: `${first} ${last}`,
      street: `${name} ${number}`,
    };

    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);

    console.log(person);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    // if (e.target.classList.contains("icon")) {
    //   const newValue = e.target.dataset.label;
    //   setTitle(newValue);
    //   setValue(person[newValue]);
    // }
    const newValue = e.target.dataset.label;
    if (newValue) {
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  const phone = () => {
    const { phone } = person;
    setTitle("phone");
    setValue(phone);
  };

  const name = () => {
    const { name } = person;
    setTitle("name");
    setValue(name);
  };

  const email = () => {
    const { email } = person;
    setTitle("email");
    setValue(email);
  };

  const age = () => {
    const { age } = person;
    setTitle("age");
    setValue(age);
  };

  const street = () => {
    const { street } = person;
    setTitle("street");
    setValue(street);
  };

  const password = () => {
    const { password } = person;
    setTitle("password");
    setValue(password);
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random-user"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onClick={handleValue}>
              <FaUser onClick={name} />
            </button>
            <button className="icon" data-label="email" onClick={handleValue}>
              <FaEnvelopeOpen onClick={email} />
            </button>
            <button className="icon" data-label="age" onClick={handleValue}>
              <FaCalendarTimes onClick={age} />
            </button>
            <button className="icon" data-label="street" onClick={handleValue}>
              <FaMap onClick={street} />
            </button>
            <button className="icon" data-label="phone" onClick={handleValue}>
              <FaPhone onClick={phone} />
            </button>
            <button
              className="icon"
              data-label="password"
              onClick={handleValue}
            >
              <FaLock onClick={password} />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
