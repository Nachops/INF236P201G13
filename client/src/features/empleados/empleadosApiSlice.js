import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/appSlice";

const empleadosAdapter = createEntityAdapter({})

const initialState = empleadosAdapter.getInitialState()

export const empleadosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmpleados: builder.query({
            query: () => '/empleados',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedEmpleados = responseData.map(empleado => {
                    empleado.id = empleado._id
                    return empleado
                });
                return empleadosAdapter.setAll(initialState, loadedEmpleados)
            },
            providesTags: (result, error, arg) => {
                if (result?.id) {
                    return [
                        {type: 'Empleado', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Empleado', id}))
                    ]
                } else return [{type: 'Empleado', id: 'LIST'}]
            }
        }),
        getEmpleadosRut: builder.query({
            query: (rut) => ({url: `/empleados/${rut}`,
        method: 'GET'})
        })
    }),
})

export const {
    useGetExamenesQuery,
    useGetEmpleadosRutQuery
} = examenesApiSlice

export const selectEmpleadosResult = examenesApiSlice.endpoints.getEmpleados.select()
export const selectEmpleadosFechaResult = examenesApiSlice.endpoints.getEmpleadosFecha.select()

const selectExamenesData = createSelector(
    [selectEmpleadosResult, selectEmpleadosFechaResult],
    empleadosResult => empleadosResult.data
)

export const {
    selectAll: selectAllEmpleados,
    selectById: selectEmpleadoById,
    selectIds: selectEmpleadoIds
} = examenesAdapter.getSelectors(state => selectExamenesData(state) ?? initialState)