import {create} from 'zustand';

const useSolicitudStore = create((set) => ({
    formData: {
        cliente: {},
        origen: {},
        destino: {},
    },
    updateFormData: (tipo, data) => set((state) => ({
        formData: {
            ...state.formData,
            [tipo]: {
                ...state.formData[tipo],
                ...data,
            },
        },
    })),
    resetFormData: () => set(() => ({
        formData: {
            cliente: {},
            origen: {},
            destino: {},
        },
    })),
}));

export default useSolicitudStore;
