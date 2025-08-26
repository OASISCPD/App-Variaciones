import { useEffect, useState } from "react"
import '../../app/utils/css/loader.scss'
import { TbLoader3 } from "react-icons/tb"
interface LoaderProps {
    visible: boolean
}

const LoaderPage: React.FC<LoaderProps> = ({ visible }) => {
    //manejamos la visibilidad del componente
    const [show, setShow] = useState<boolean>(visible)
    useEffect(() => {
        if (visible) {
            setShow(true)
        } else {
            //retrasar la eliminacion para que termine la animacion
            setTimeout(() => {
                setShow(false)
            }, 500);
        }
    }, [visible])

    return show ? (
        <div className={`loader-container ${visible ? 'visible' : 'hidden'}`}>
            <div className="loader">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="loader__bar"></div>
                ))}
                <div className="loader__ball"></div>
            </div>
        </div>
    ) : null
}
export default LoaderPage


export const LoaderHover: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-[var(--accent-200)]">
                <TbLoader3 className="animate-spin text-4xl sm:text-5xl mb-2" />
                <span className="text-sm sm:text-base font-medium">Cargando...</span>
            </div>
        </div>
    )
}


import '../utils/css/loaderDomain.scss'
interface LoaderProps {
    visible: boolean
}

export const LoaderPageDomain: React.FC<LoaderProps> = ({ visible }) => {
    //manejamos la visibilidad del componente
    const [show, setShow] = useState<boolean>(visible)

    useEffect(() => {
        if (visible) {
            setShow(true)
        } else {
            //retrasar la eliminacion para que termine la animacion
            setTimeout(() => {
                setShow(false)
            }, 2500)
        }
    }, [visible])

    return show ? (
        <div className={`loader-container ${visible ? "visible" : "hidden"}`}>
            <div className="palm-loader">
                <div className="palm-tree">
                    <img src="/images/pilar/icon.png" alt="Logo" className="palm-image" />
                </div>
                <div className="dots-circle">
                    {[...Array(24)].map((_, i) => (
                        <div
                            key={i}
                            className="dot"
                            style={{
                                transform: `rotate(${i * 15}deg) translateY(-40px)`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    ) : null
}
