import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect } from 'react'
import Header from '../components/AppLayout'

export default function Home() {
  const session = useSession()

  return (
    <div className=" w-full">

    </div>
  )
}
