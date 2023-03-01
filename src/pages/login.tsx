import { SignInResponse, signIn } from "next-auth/react"
import TextInput from "../components/TextInput"
import { useState, KeyboardEvent } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { toastPromiseUpdate } from "../helpers/toastPromise"

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const listenForEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    const handleLogin = async () => {
        const toastId = toast.loading('Entrando...')
        signIn("credentials", { username: email, password, redirect: false }).then((res) => {
            const response: SignInResponse = res!

            if (response.ok) {
                toast.update(toastId, toastPromiseUpdate('success', 'Login realizado com sucesso!'))

                router.push("/")
            } else {
                toast.update(toastId, toastPromiseUpdate('error', 'E-mail ou senha incorretos. Tente novamente'))
            }
        })
    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 pb-16 bg-white" onKeyUp={(e) => listenForEnter(e)}>
                <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                    <div className="h-16 w-16 bg-gray-400 rounded-xl"></div>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Entrar em sua conta</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            ou{' '}
                            <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-poi" onClick={() => router.push("/register")}>
                                Registrar
                            </span>
                        </p>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="flex flex-col gap-4">
                            <div>
                                <TextInput
                                    title="Email"
                                    setValue={setEmail}
                                    value={email}
                                />
                            </div>

                            <div>
                                <TextInput
                                    title="Senha"
                                    setValue={setPassword}
                                    value={password}
                                    hide={hidePassword}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        onChange={() => setHidePassword(!hidePassword)}
                                        checked={!hidePassword}
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        Mostrar senha
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={handleLogin}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
