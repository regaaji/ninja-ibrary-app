const genreModels = require('../models/genres')

const helper = require('../helpers/index')

module.exports = {
    //async menunggu data result 
    getGenres: async function (request, response) {
        try {
            const result = await genreModels.getGenres()

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)

        }
    },

    postGenres: async function (request, response) {

        try {

            const setData = request.body
            console.log(setData)
            const result = await genreModels.postGenres(setData)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }


    },

    putGenre: async function (request, response) {

        try {

            const setData = request.body
            const id = request.params.id
            console.log(setData)
            const result = await genreModels.putGenre(setData, id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }


    },

    deleteGenre: async function (request, response) {

        try {

            const id = request.params.id
            const result = await genreModels.deleteGenre(id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }


    }


}