import { MagnifyingGlassPlus } from "phosphor-react"

export function CreateAdBanner() {
    return(
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden ">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl font-black text-white block">Não encontrou seu duo?</strong>
            <span className="text-zinc-300 block">Publique um anúncio para encontrar novos players!</span>
          </div>
          
          <button className="py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24}/>
            Publicar anúncio
          </button>
        </div>
      </div>
    )
}