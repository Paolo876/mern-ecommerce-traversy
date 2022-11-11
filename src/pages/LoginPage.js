import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-router-dom'
import Message from "../components/Message"
import Loader from "../components/Loader"
import useUserRedux from '../hooks/useUserRedux'

const LoginPage = () => {
  const { login } = useUserRedux();
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage