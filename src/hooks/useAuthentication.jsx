import {db} from "../firebase/config"

// import das funções do firebase
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth"

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // variável para limpar as funções posteriormente
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    // função para fazer a limpeza, para esvaziar a memória
    function checkIfsCancelled() {
        if(cancelled) {
            return
        }
    }

    // função para criar o user
    const createUser = async (data) => {

        checkIfsCancelled()

        setLoading(true)

        setError(null)

        // aqui vai tentar criar o user, caso não consiga vai cair no catch
        try {

            // colocando as informações que o user vai receber
            const {user} = createUserWithEmailAndPassword(
                auth, 
                data.email,
                data.password
            )

            // após informar o que ele vai receber, o firebase obriga a fazer esse update
            await updateProfile(user, {
                displayName: data.displayName
            })

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            // caso ocorra algum erro, para exibir essas mensagens
            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente mais tarde."
            }

            setError(systemErrorMessage)
        }

        setLoading(false)
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth, 
        createUser,
        error,
        loading,
    }

}