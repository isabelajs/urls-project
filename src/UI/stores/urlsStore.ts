import { IUrls } from "../../User/domain/interfaces/urls.interface";
import { LocalStorageAdapter } from "../../Shared/infraestructure/local-storage.adapter";
import { UserAdapter } from "../../User/infrastructure/User.Adapter";
import { create } from "zustand";

interface IUrlsStore {
  urls: IUrls[];
  addUrl: (email: string, url: IUrls) => void;
  removeUrl: (email: string, nameUrl: string) => void;
  getUrls: (email: string) => Promise<void>;
}

const cacheRepository = new LocalStorageAdapter();
const userRepository = new UserAdapter(cacheRepository);

export const useUrlsStore = create<IUrlsStore>((set,get) => ({
  urls: [],
  addUrl: async (email: string, url: IUrls) =>{
    await userRepository.saveUrlsByEmail(email, url);
    set({ urls: [...get().urls, url] });
  },
  removeUrl: async (email: string, nameUrl: string) => {
    await userRepository.removeUrl(email, nameUrl);
    set({ urls: get().urls.filter((url) => url.name !== nameUrl) });
  },
  getUrls: async (email: string) => {
    const urls = await userRepository.getUrlsByEmail(email);
    set({ urls });
  },

}));
