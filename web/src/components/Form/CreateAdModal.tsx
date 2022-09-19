import { FormEvent, useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, GameController, CaretDoubleDown } from 'phosphor-react';
import { Input } from './Input';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal(){

    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
    const [gameSelected, setGameSelected] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:3333/games')
          .then(response => response.json())
          .then(data => {
            setGames(data);
          })
      }, []);

      function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
      }

    return(
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>

                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[520px] shadow-xl shadow-violet-900/50">
                <Dialog.Title className="text-3xl font-black"> Publique um anúncio</Dialog.Title>
                  <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    
                    <div className="flex flex-col gap-2 overflow-hidden">
                      <label htmlFor="game" className="font-semibold">Qual o game?</label>
                      <Select.Root onValueChange={setGameSelected}>
                            <Select.Trigger aria-label="game" className="bg-zinc-900 py-3 px-4 rounded text-sm flex justify-between">
                                <Select.Value placeholder="Selecione o game que deseja jogar" />
                                <Select.Icon>
                                    <CaretDoubleDown className="w-4 h-4"/>
                                </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal className="bg-zinc-900 rounded-sm text-white w-3/4 p-2 flex place-items-center">
                                <Select.Content >
                                        <Select.Viewport>
                                            {games.map((item) =>(
                                                <Select.Item key={item.id} value={item.id} className="hover:bg-violet-600 p-2 ">
                                                    <Select.ItemText >{item.title}</Select.ItemText>
                                                </Select.Item>
                                            ))}
                                        </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                      <Input 
                        id="name"
                        name="name" 
                        placeholder="como te chamam dentro do game?"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="yearsPlayng" className="font-semibold">Joga há quantos anos?</label>
                        <Input type="number" id="yearsPlayng" name="yearsPlayng" placeholder="Tudo bem ser Zero"/>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
                        <Input id="discord" name="discord" placeholder="Usuário#0000"/>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
                            <ToggleGroup.Root
                              type="multiple"
                              className="grid grid-cols-4 gap-2"
                              onValueChange={setWeekDays}
                            >
                              <ToggleGroup.Item
                                value="0"
                                title="Domingo"
                                className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                D
                              </ToggleGroup.Item>
                              <ToggleGroup.Item
                                value="1"
                                title="Segunda"
                                className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                S
                              </ToggleGroup.Item>
                              <ToggleGroup.Item
                                value="2"
                                title="Terça"
                                className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                T
                              </ToggleGroup.Item>
                              <ToggleGroup.Item
                                value="3"
                                title="Quarta"
                                className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                Q
                              </ToggleGroup.Item>
                              <ToggleGroup.Item
                                value="4"
                                title="Quinta"
                                className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                Q
                              </ToggleGroup.Item>
                              <ToggleGroup.Item
                                value="5"
                                title="Sexta"
                                className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                S
                              </ToggleGroup.Item>
                              <ToggleGroup.Item
                                value="6"
                                title="Sábado"
                                className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                              >
                                S
                              </ToggleGroup.Item>
                            </ToggleGroup.Root>
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="time" id="hourStart" name="hourStart" placeholder="De"/>
                          <Input type="time" id="hourEnd" name="hourEnd" placeholder="Até"/>
                        </div>
                      </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm">
                      <Checkbox.Root
                        checked={useVoiceChannel}
                        onCheckedChange={(checked) => {
                          if(checked === true) {
                            setUseVoiceChannel(true)
                            } else {
                              setUseVoiceChannel(false)
                            }
                        }} 
                        className="w-6 h-6 p-1 rounded bg-zinc-900"
                      >
                        <Checkbox.Indicator>
                            <Check className="w-4 h-4 text-emerald-400"/>
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      Costumo me conectar ao chat de voz
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                      <Dialog.Close className="bg-zinc-500 hover:bg-zinc-700 px-5 h-12 rounded-md font-semibold">Cancelar</Dialog.Close>
                      <button
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-700 px-5 h-12 rounded-md font-semibold flex items-center gap-3" 
                      >
                        <GameController className="w-6 h-6"/>Encontrar duo
                      </button>
                    </footer>

                  </form>
                </Dialog.Content>
          </Dialog.Portal>
    )
}