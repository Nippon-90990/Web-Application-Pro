import { React, useState, useRouter } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'
import styles from '../styles/Login.module.css'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const router = useRouter('')

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let response = await res.json()
    console.log(response)
    setEmail('')
    setPassword('')
    if (response.succese) {
      localStorage.setItem('token', response.token)
      toast.success('Your Are Succesfully Loged In', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push(process.env.local.NEXT_PUBLIC_HOST)
      }, 1000);
    }
    else {
      toast.error(response.error), {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };
    }
  }

  return (
    <Layout>
      {/* <Head>
        <title>Login</title>
      </Head> */}

      <section className='w-3/4 mx-auto flex flex-col gap-10'>
      <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="title">
          <h1 className='text-gray-800 text-4xl font-bold py-4'>Login</h1>
          <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, libero!</p>
        </div>

        {/* forrm  */}

        <form className='flex flex-col gap-5' onSubmit={handleSubmit} method='POST'>

          <div className={styles.inputGroup}>
            <input value={email} onChange={handleChange} className={styles.inputText} required type="email" name="email" id="email" placeholder='Email' /><span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
          </div>

          <div className={styles.inputGroup}>
            <input value={password} onChange={handleChange} className={styles.inputText} required type={`${show ? "text" : "password"}`} name="password" id="password" placeholder='Password' /><span className='icon flex items-center px-4' onClick={() => setShow(!show)}><HiFingerPrint size={25} className='cursor-pointer' /></span>
          </div>

          {/* button */}

          <div className="inputButton">
            <button type='submit' className={styles.button}>
              Log In
            </button>
          </div>

          {/* <div className="inputButton">
            <button type='button' className={styles.buttonCustum}>
              <Image src={'/google.svg'} height={20} width={20}></Image> Log In With Google
            </button>
          </div> */}

          {/* <div className="inputButton">
            <button type='button' className={styles.buttonCustum}>
              <Image src={'/facebook.svg'} height={25} width={25}></Image> Log In With Facebook
            </button>
          </div> */}

        </form>
        <p className='text-center text-gray-400'>
          Don't have a account yet? <Link className='text-blue-700' href={'/Signup'}>Sign Up</Link>
        </p>

      </section>

    </Layout>
  )
}

export default login