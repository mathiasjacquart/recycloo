import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signup } from "../../services/users";

function Signup() {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] =
    useState(false);

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };
  const handleSeeConfirmPassword = () => {
    setSeeConfirmPassword(!seeConfirmPassword);
  };
  const userSchema = z
    .object({
      email: z.string().email("Email non valide"),
      password: z
        .string()
        .min(
          8,
          "Le mot de passe doit contenir au moins 8 caractères"
        )
        .regex(/[A-Z]/, {
          message:
            "Le mot de passe doit contenir au moins une majuscule.",
        })
        .regex(/[a-z]/, {
          message:
            "Le mot de passe doit contenir au moins une minuscule.",
        })
        .regex(/[0-9]/, {
          message:
            "Le mot de passe doit contenir au moins un chiffre.",
        }),
      confirmPassword: z.string(),
      rgpd: z.literal(true, {
        errorMap: () => ({
          message:
            "Vous devez accepter les conditions RGPD.",
        }),
      }),
    })
    .refine(
      (data) => {
        console.log(
          "password:",
          data.password,
          "confirmPassword,",
          data.confirmPassword
        );
        return data.password === data.confirmPassword;
      },
      {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      }
    );

  type UserFormData = z.infer<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      // Exclure confirmPassword avant l'envoi à l'API
      const { confirmPassword, rgpd, ...formData } = data;

      console.log("Formulaire valide:", data);

      // Appel API sécurisé
      const response = await signup(formData);
      console.log("Réponse API:", response);

      // Gérer la réussite (ex: rediriger l'utilisateur)
      alert("Inscription réussie !");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert(
        "Une erreur est survenue lors de l'inscription."
      );
    }
  };
  return (
    <div className="container flex items-center justify-center mx-auto min-h-90">
      <div className="border border-gray-300 border-radius-8 flex-col flex justify-center items-center p-20 shadow ">
        <h3 className="text-2xl font-inter text-secondary font-semibold mb-7">
          Création du compte
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col "
        >
          <div className="flex flex-col font-inter ">
            <input
              type="email"
              {...register("email")}
              className="input-form"
              placeholder="Email"
            />
            {errors.email && (
              <p className="error-warning">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col font-inter">
            <div className="relative">
              {seePassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 absolute right-4 top-2.5"
                  onClick={handleSeePassword}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 absolute right-4 top-2.5"
                  onClick={handleSeePassword}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}

              <input
                {...register("password")}
                type={!seePassword ? "password" : "text"}
                name="password"
                className="input-form w-full"
                placeholder="Mot de passe"
              />
            </div>

            {errors.password && (
              <p className="error-warning">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col font-inter">
            <div className="relative">
              {seeConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 absolute right-4 top-2.5"
                  onClick={handleSeeConfirmPassword}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 absolute right-4 top-2.5"
                  onClick={handleSeeConfirmPassword}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              <input
                {...register("confirmPassword")}
                type={
                  !seeConfirmPassword ? "password" : "text"
                }
                name="confirmPassword"
                className="input-form w-full"
                placeholder="Confirmer votre mot de passe"
              />
              {errors.confirmPassword && (
                <p className="error-warning">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <label className="flex items-center">
            <input
              className="mr-1"
              type="checkbox"
              {...register("rgpd")}
            />
            En poursuivant votre inscription, vous acceptez
            notre{" "}
            <span className="cursor-pointer underline text-red-500">
              {" "}
              Politique de confidentialité
            </span>
            .
          </label>
          {errors.rgpd && (
            <p className="error-warning">
              {errors.rgpd.message}
            </p>
          )}
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
