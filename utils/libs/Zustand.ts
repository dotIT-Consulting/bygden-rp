import create from 'zustand';
import { ISteamResponse } from '@utils/Types';

interface ISteamState {
  steamProfile: ISteamResponse | null
  setSteamProfile: (profile: ISteamResponse) => void
}

const useStore = create<ISteamState>(set => ({
  steamProfile: null,
  setSteamProfile: (profile: ISteamResponse) => set({
    steamProfile: profile
  })
}))

export {
  useStore
}