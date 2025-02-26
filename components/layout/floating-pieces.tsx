"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChessBishop, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from "react-icons/fa6";

const chessIcons = [FaChessKnight, FaChessPawn, FaChessQueen, FaChessBishop, FaChessRook]

export default function FloatingChessPieces({ count = 50 }) {
    const getPageHeight = () => document.documentElement.scrollHeight;

    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: getPageHeight() })

    useEffect(() => {
        setDimensions({
            width: window.innerWidth,
            height: getPageHeight(),
        })

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: getPageHeight(),
            })
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="relative w-full h-full overflow-x-hidden">
            {Array.from({ length: count }).map((_, i) => {
                const Icon = chessIcons[i % chessIcons.length]
                return (
                    <motion.div
                        key={i}
                        className="absolute z-10"
                        initial={{
                            x: Math.random() * dimensions.width,
                            y: Math.random() * dimensions.height,
                        }}
                        animate={{
                            x: [Math.random() * dimensions.width, Math.random() * dimensions.width, Math.random() * dimensions.width],
                            y: [
                                Math.random() * dimensions.height,
                                Math.random() * dimensions.height,
                                Math.random() * dimensions.height,
                            ],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 150 + Math.random() * 50,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    >
                        <div className="p-3 bg-[#ea5a0c42] rounded-md border border-[#ea5a0c7e] opacity-70 text-[#EA580C]">
                            <Icon className="w-8 h-8"/>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

