import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/appSlice";

const pacientesAdapter = createEntityAdapter({})

const initialState = pacientesAdapter.getInitialState()

export const pacientesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPacientes: builder.query({
            query: () => '/pacientes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedPacientes = responseData.map(paciente => {
                    paciente.id = paciente._id
                    return paciente
                });
                return pacientesAdapter.setAll(initialState, loadedPacientes)
            },
            providesTags: (result, error, arg) => {
                if (result?.id) {
                    return [
                        {type: 'Paciente', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Paciente', id}))
                    ]
                } else return [{type: 'Paciente', id: 'LIST'}]
            }
        }),
        addNewPaciente: builder.mutation({
            query: initialPacienteData => ({
                url: '/pacientes',
                method: 'POST',
                body: initialPacienteData
            }),
            invalidatesTags: [
                {type: 'Paciente', id: 'LIST'}
            ]
        }),
        getPacienteId: builder.query({
            query: (id) => `/pacientes/${id}`
        }),
        getPacienteRut: builder.query({
            query: (rut) => `/pacientes/rut/${rut}`
        })
    }),
})

export const {
    useGetPacientesQuery,
    useAddNewPacienteMutation,
    useGetPacienteIdQuery,
    useGetPacienteRutQuery
} = pacientesApiSlice

export const selectPacientesResult = pacientesApiSlice.endpoints.getPacientes.select()
export const selectPacienteIdResult = pacientesApiSlice.endpoints.getPacienteId.select()
export const selectPacienteRutResult = pacientesApiSlice.endpoints.getPacienteRut.select()

const selectPacientesData = createSelector(
    [selectPacientesResult, selectPacienteIdResult, selectPacienteRutResult],
    pacientesResult => pacientesResult.data
)

export const {
    selectAll: selectAllPacientes,
    selectById: selectPacienteById,
    selectIds: selectPacienteIds
} = pacientesAdapter.getSelectors(state => selectPacientesData(state) ?? initialState)