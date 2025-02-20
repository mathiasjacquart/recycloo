import { useState } from "react"

function Signin() {
  const [email, setEmail] = useState('')
  const handleChange =(e :React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  console.log(email);
  
  return (
    <div className='container flex items-center justify-center mx-auto min-h-90'>
            <div className='border border-gray-300 border-radius-8 flex-col flex justify-center items-center p-20 shadow '>
              <h3 className="text-2xl font-inter text-secondary font-semibold mb-7">Connexion</h3>                                
                <form action="" className="flex flex-col ">
                  <div className="flex flex-col font-inter ">
                    <label  className='font-semibold'htmlFor="">Email :</label>
                    <input type="email" name="email" value={email} onChange={handleChange} className="input-form" placeholder="Email"/>
                  </div>
                  <div className="flex flex-col font-inter">
                    <label className='font-semibold' htmlFor="">Mot de passe :</label>
                    <input type="password" name="password" className="input-form" placeholder="Mot de passe" />
                  </div>
                </form>
                <div className="flex flex-col items-center">
                  <a href="">Mot de passe oublié ? </a>
                  <a href="">Inscris-toi ici</a>
                </div>
            </div>
    </div>
  )                                         
}

export default Signin