// import React from "react"

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
    return(
        <a href="" className="relative rounded-lg overflow-hidden">
            <img src={props.bannerUrl}/>

            <div className="w-full pt-16 pb-4 px-4 bg-card-game-gradient absolute bottom-0 right-0 left-0">
                <strong className="font-bold text-white block">{props.title}</strong>
                <span className="text-zinc-300 block">{props.adsCount} anúncios(s)</span>
            </div>
        </a>
    )

}

