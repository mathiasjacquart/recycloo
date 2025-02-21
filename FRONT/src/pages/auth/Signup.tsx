import React from 'react'
import { useState } from 'react'
import {z} from "zod"
import {useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

function Signup() {

    const userSchema = z.object({
      email: z.string().email("Email non valide"),
      password: z.string()
      .min(8, "Le mot de passe doit contenir au moins")
      .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule." })
      .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une minuscule." })
      .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre." }),
      confirmPassword:z.string(),
      rgpd: z.literal(true, {
        errorMap: () => ({ message: "Vous devez accepter les conditions RGPD." }),
      }),
    }).refine(data => data.password === data.confirmPassword, {
      message:"Les mots de passe ne correspondent pas",
      path:["confirmPasssword"]
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: object) => {
      console.log("formulaire valide:", data);
      
    }
  return (
    <div className='container flex items-center justify-center mx-auto min-h-90'>
    <div className='border border-gray-300 border-radius-8 flex-col flex justify-center items-center p-20 shadow '>
      <h3 className="text-2xl font-inter text-secondary font-semibold mb-7">Création du compte</h3>                                
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="flex flex-col font-inter ">
            <input type="email" {...register("email")} className="input-form" placeholder="Email"/>
            {errors.email && <p className='error-warning'>{errors.email.message}</p>}
          </div>
          <div className="flex flex-col font-inter">
            <input  {...register("password")} type="password" name="password" className="input-form" placeholder="Mot de passe" />
            {errors.password && <p className='error-warning'>{errors.password.message}</p>}
          </div>
          <div className="flex flex-col font-inter">
            <input  {...register("confirmPassword")} type="password" name="password" className="input-form" placeholder="Mot de passe" />
            {errors.confirmPassword && <p className='error-warning'>{errors.confirmPassword.message}</p>}
          </div>
          <label className='flex items-center'>
          <input className='mr-1'type="checkbox" {...register("rgpd")} />
          En poursuivant votre inscription, vous acceptez notre <span className='cursor-pointer underline text-red-500'> Politique de confidentialité</span>.
          </label>
          {errors.rgpd && <p className='error-warning'>{errors.rgpd.message}</p>}
          <button type="submit">S'inscrire</button>
        </form>
    </div>
</div>
  )
}

export default Signup