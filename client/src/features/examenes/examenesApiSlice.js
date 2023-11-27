import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/appSlice";

const examenesAdapter = createEntityAdapter({})

const initialState = examenesAdapter.getInitialState()

export const examenesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getExamenes: builder.query({
            query: () => '/examenes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedExamenes = responseData.map(examen => {
                    examen.id = examen._id
                    return examen
                });
                return examenesAdapter.setAll(initialState, loadedExamenes)
            },
            providesTags: (result, error, arg) => {
                if (result?.id) {
                    return [
                        {type: 'Examen', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Examen', id}))
                    ]
                } else return [{type: 'Examen', id: 'LIST'}]
            }
        }),
        getExamenesFecha: builder.query({
            query: (fecha) => ({url: `/examenes/${fecha}`,
            method: 'GET'})
        }),
        getExamenesFechaBloque: builder.query({
            query: ({fecha,bloque}) => `/examenes/block/${fecha}/${bloque}`
        }),
        getExamenId: builder.query({
            query: (id) => `/examenes/id/${id}`
        }),
        addNewExamen: builder.mutation({
            query: initialExamenData => ({
                url: '/examenes',
                method: 'POST',
                body: initialExamenData
            }),
            invalidatesTags: [
                {type: 'Examen', id: 'LIST'}
            ]
        }),


    }),
})

export const {
    useGetExamenesQuery,
    useGetExamenesFechaQuery,
    useGetExamenesFechaBloqueQuery,
    useGetExamenIdQuery,
    useAddNewExamenMutation
} = examenesApiSlice

export const selectExamenesResult = examenesApiSlice.endpoints.getExamenes.select()
export const selectExamenesFechaResult = examenesApiSlice.endpoints.getExamenesFecha.select()
export const selectExamenesFechaBloqueResult = examenesApiSlice.endpoints.getExamenesFechaBloque.select()
export const selectExamenIdResult = examenesApiSlice.endpoints.getExamenId.select()

const selectExamenesData = createSelector(
    [selectExamenesResult, selectExamenesFechaResult, selectExamenesFechaBloqueResult,selectExamenIdResult],
    examenesResult => examenesResult.data
)

export const {
    selectAll: selectAllExamenes,
    selectById: selectExamenById,
    selectIds: selectExamenIds
} = examenesAdapter.getSelectors(state => selectExamenesData(state) ?? initialState)