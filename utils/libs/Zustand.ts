import create from 'zustand';
import { ISteamResponse, ICharacterResponse } from '@utils/Types';

interface ISteamState {
  steamProfile: ISteamResponse | null,
  setSteamProfile: (profile: ISteamResponse) => void,
  characters: Array<ICharacterResponse> | null,
  setCharacters: (charactersResponse: Array<ICharacterResponse>) => void,
}

const useStore = create<ISteamState>(set => ({
  steamProfile: null,
  setSteamProfile: (profile: ISteamResponse) => set({
    steamProfile: profile
  }),
  characters: null,
  setCharacters: (charactersResponse: Array<ICharacterResponse>) => set({
    characters: charactersResponse
  })
}))

export {
  useStore
}