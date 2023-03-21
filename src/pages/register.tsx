import { SignInResponse, signIn } from "next-auth/react"
import TextInput from "../components/TextInput"
import { useState, KeyboardEvent } from "react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { toastPromiseUpdate } from "../helpers/toastPromise"
import Button from "../components/Button"
import { registerUser } from "../services/UserService"
import Modal from "../components/Modal"
import Footer from "../components/Footer"

export default function Register() {
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const listenForEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            handleRegister()
        }
    }

    const handleRegister = async () => {
        if (!email || !password || !name) return toast.error('Preencha todos os campos!')

        if (!email.includes('@')) return toast.error('Email inválido!')

        if (password.length < 8) return toast.error('A senha deve conter no mínimo 8 caracteres!')

        if (password !== confirmPassword) return toast.error('As senhas não coincidem!')

        const toastId = toast.loading('Criando conta...')
        registerUser({ name, email, password }).then((res) => {
            toast.update(toastId, toastPromiseUpdate('success', 'Casdastro realizado com sucesso!'))
        }).catch((err) => {
            toast.update(toastId, toastPromiseUpdate('error', 'Erro ao criar conta!'))
        }).finally(() => {
            router.push('/login')
        })
    }

    return (
        <>
            <div className="h-screen flex flex-col items-center justify-center py-12 sm:px-8 pb-16 bg-white" onKeyUp={(e) => listenForEnter(e)}>
                <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
                    <div className="flex-shrink-0 flex items-center text-4xl font-normal">
                        <i className="fas fa-sticky-note mr-2 text-gray-700" />
                        <p className="text-gray-700"><span className="font-semibold">Todo</span>List</p>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="sm:bg-white py-6 sm:shadow sm:rounded-lg sm:px-10 sm:w-full w-[275px]">
                        <div className="flex flex-col gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nome
                                </label>
                                <TextInput
                                    setValue={setName}
                                    value={name}
                                    placeholder="Nome"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <TextInput
                                    setValue={setEmail}
                                    value={email}
                                    placeholder="Email"
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
                                    placeholder="Senha"
                                />
                                <div className={`flex items-center ${password.length < 8 ? "text-gray-500" : "text-gray-400 line-through"} text-sm ml-2`}>
                                    <i className={`fas fa-${password.length < 8 ? "times" : "check"}`}></i>
                                    <span className="ml-1">Mínimo de 8 caracteres</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Confirmar senha
                                </label>
                                <input
                                    className="focus:outline-none focus:border-gray-500 block w-full px-4 py-3 mb-2 transition-colors text-sm placeholder-gray-500 bg-white border rounded"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmar senha"
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
                                <Button text="Registrar" action={handleRegister} />
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                        <span className="text-sm text-gray-400 mr-1" >
                            Já possui uma conta?
                            <span className="cursor-pointer text-gray-500 hover:font-medium pl-1" onClick={() => router.push("/login")}>Entrar</span>
                        </span>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
