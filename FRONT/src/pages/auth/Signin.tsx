import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signin } from "../../services/users";
import { UserContext } from "../../context/UserContext";

function Signin() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { setConnectedUser, user } = userContext;
  console.log(user);

  const [seePassword, setSeePassword] = useState(false);
  const [feedback, setFeedback] = useState("");
  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };
  const userSchemaSignIn = z.object({
    email: z.string().email("Email non valide"),
    password: z.string(),
  });

  type UserFormData = z.infer<typeof userSchemaSignIn>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchemaSignIn),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      console.log(data);
      const response = await signin(data); // Si ça échoue, on va directement dans le catch

      // Vérification si response contient une erreur côté backend
      if (response.data?.message) {
        setFeedback(response.data.message); // Affiche le message d'erreur du backend
        return; // Stoppe l'exécution ici
      }

      // Si pas d'erreur, on stocke l'utilisateur et on reset le formulaire
      localStorage.setItem("user", JSON.stringify(response));
      setConnectedUser(response.user);
      reset();

      console.log(response);
    } catch (error: any) {
      // Vérifie si c'est une erreur Axios et si le backend a renvoyé un message d'erreur
      if (error.response && error.response.data) {
        console.error(
          "Erreur lors de la connexion :",
          error.response.data.message
        );
        setFeedback(error.response.data.message); // Affiche l'erreur du backend
      } else {
        console.error("Erreur inattendue :", error.message);
        setFeedback("Une erreur inattendue s'est produite.");
      }
    }
  };

  console.log(feedback);
  return (
    <div className="container flex items-center justify-center mx-auto min-h-90">
      <div className="border border-gray-300 border-radius-8 flex-col flex justify-center items-center p-20 shadow ">
        <h3 className="text-2xl font-inter text-secondary font-semibold mb-7">
          Connexion
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="flex flex-col font-inter ">
            <input
              {...register("email")}
              type="email"
              name="email"
              className="input-form"
              placeholder="Email"
            />
            {errors.email && (
              <p className="error-warning">{errors.email.message}</p>
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
              <p className="error-warning">{errors.password.message}</p>
            )}
          </div>
          <button type="submit">Se connecter</button>
          {feedback && <p className="text-red-500">{feedback} </p>}
        </form>
        <div className="flex flex-col items-center">
          <a href="">Mot de passe oublié ? </a>
          <Link to="/sign-up">Inscris-toi ici</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
