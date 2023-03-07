import { SignInResponse, signIn } from "next-auth/react"
import TextInput from "../components/TextInput"
import { useState, KeyboardEvent } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { toastPromiseUpdate } from "../helpers/toastPromise"
import Button from "../components/Button"

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
        if (!email || !password) return toast.error('Preencha todos os campos!')

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
                    <div className="flex-shrink-0 flex items-center text-4xl font-normal">
                        <i className="fas fa-sticky-note mr-2 text-gray-700" />
                        <p className="text-gray-700"><span className="font-semibold">Todo</span>List</p>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <TextInput
                                    setValue={setEmail}
                                    value={email}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <input
                                    className="focus:outline-none focus:border-gray-500 block w-full px-4 py-3 mb-2 transition-colors text-sm placeholder-gray-500 bg-white border rounded"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={hidePassword ? "password" : "text"}
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
                                <Button text="Entrar" action={handleLogin} />
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                        <span className="text-sm text-gray-400 mr-1" >
                            Não possui uma conta?
                            <span className="cursor-pointer text-gray-500 hover:font-medium pl-1" onClick={() => router.push("/register")}>Cadastre-se</span>
                        </span>
                    </div>
                </div>

            </div >
        </>
    )
}
