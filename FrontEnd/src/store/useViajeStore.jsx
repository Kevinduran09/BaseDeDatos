import {create} from 'zustand';

export const useViajeStore = create((set) => ({
    selectedRequests: [], 
    vehicleId: null,
    employeeIds: [], 
    fechaViaje:'',
    vehicle:{},

    toggleRequestSelection: (requestId, isSelected) => {
        set((state) => {
            const updatedRequests = isSelected
                ? [...state.selectedRequests, requestId]
                : state.selectedRequests.filter(id => id !== requestId);
            return { selectedRequests: updatedRequests };
        });
    },

  
    setVehicleId: (vehicleId, vehicle) => {
        set({ vehicleId, vehicle });
    },
    setFechaViaje: (fechaViaje)=>{
        set({ fechaViaje })
    },

    toggleEmployeeSelection: (employeeId, isSelected) => {
        set((state) => {
            const updatedEmployees = isSelected
                ? [...state.employeeIds, employeeId]
                : state.employeeIds.filter(id => id !== employeeId);
            return { employeeIds: updatedEmployees };
        });
    },

  
    resetStore: () => set({
        selectedRequests: [],
        vehicleId: null,
        employeeIds: [],
    }),
}));
