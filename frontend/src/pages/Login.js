import './Login.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { get, post, put } from '../utilities'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Login = () => {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const setUser = (flag) => {
    setCurrentUser(flag);
    if (!flag) {
      sessionStorage.removeItem("userInfo");
    }
    else {
      let userInfo = {
        email: email,
        username: username
      }
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }

  useEffect(() => {
    get("http://127.0.0.1:8000/users/user")
      .then(function (res) {
        console.log(res);
        setUser(true);
      })
      .catch(function (error) {
        console.log("no login");
        setUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    post(
      "http://127.0.0.1:8000/users/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function (res) {
      post(
        "http://127.0.0.1:8000/users/login",
        {
          email: email,
          password: password
        }
      ).then(function (res) {
        setUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    post(
      "http://127.0.0.1:8000/users/login",
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    post(
      "http://127.0.0.1:8000/users/logout",
      { withCredentials: true }
    ).then(function (res) {
      setUser(false);
    });
  }


  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="center">
          <h2>You're logged in!</h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Authentication</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        registrationToggle ? (
          <div className="center">
            <Form onSubmit={e => submitRegistration(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <div className="center">
            <Form onSubmit={e => submitLogin(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
      }
    </div>
  );
}

export default Login;
