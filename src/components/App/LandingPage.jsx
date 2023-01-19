import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const FormWrapper = styled.form`
  width: 500px;
  margin: 15px auto;
  padding: 10px 20px;
  background-color: antiquewhite;
  border: solid 1px gray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    font-size: 20px;
    width: 200px;
    height: 40px;
    margin: 10px auto;
    border: transparent;
    border-radius: 25px;
    color: whitesmoke;
    background-color: rgb(23, 23, 99);
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  label {
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    input {
      font-size: 16px;
      margin-top: 5px;
      padding: 2px 1px;
      outline: 0;
      background-color: antiquewhite;
      border-width: 0 0 1px;
      border-color: gray;
    }
  }
`;

export const LandingPage = () => {
  const navigate = useNavigate();
  const [Params, setParams] = useState({
    hostname: "",
    port: "",
    radius: 2,
  });
  const handleChange = (event) => {
    setParams({ ...Params, [event.target.name]: event.target.value });
  };
  const goToGame = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/game",
      search: `?${createSearchParams(Params)}`,
    });
  };
  return (
    <FormWrapper onSubmit={goToGame}>
      <label>
        <span>Hostname</span>
        <input
          type="text"
          name="hostname"
          value={Params.hostname}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Port</span>
        <input
          type="text"
          name="port"
          value={Params.port}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Radius {Params.radius}</span>
        <input
          type="range"
          name="radius"
          min="2"
          max="4"
          step="1"
          value={Params.radius}
          onChange={handleChange}
        />
      </label>
      <button type="submit" value="Play">
        PLAY
      </button>
    </FormWrapper>
  );
};
