'use client'
import { useEffect, useState } from "react"
import { getNotProtectedRoutes } from "@/libs/database/notprotectedroutes"
import icon from "../../../../../public/assets/icon/new-icon.png"
import { MenuItem } from "@/shared/types/menuitem"
import { useRouter } from "next/navigation"
import Image from "next/image"
const Navbar = () => {
  const [routes, setRoutes] = useState<MenuItem[]>([])
  const Router = useRouter()
  useEffect(() => {
    getNotProtectedRoutes().then(setRoutes)
  }, [])

  return (
    <div className={`
      flex flex-1 w-full h-full bg-card-primary p-1
      gap-2`}>
      <div className={`flex flex-1 h-full justify-start items-center `}>
        <Image src={icon} alt="Logo Menu" height={150} width={150} priority />
      </div>
      `<div className={`flex flex-4 h-full gap-6 justify-center items-center`}>
        {routes.map(route => (
          <a key={route.id} href={route.route} 
            className={`
              text-button-primary font-bold 
              transition-all duration-100 ease-in-out
              hover:font-black 
              hover:text-lg
              hover:underline 
              underline-offset-8`}>{route.nama}</a>
        ))}
      </div>`
      <div className={`flex flex-1 h-full justify-center items-center px-5 py-1`}>
        <button className="
          flex h-full items-center justify-center rounded-3xl
          bg-button-primary px-5 text-white font-bold
          transition-all duration-100 ease-in-out
          hover:text-lg
          hover:font-black hover:bg-button-secondary hover:text-indigo-200 
          cursor-pointer"
          onClick={() => Router.push("/login")}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Navbar
