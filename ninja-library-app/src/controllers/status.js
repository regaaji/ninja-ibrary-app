const statusModels = require('../models/status')

const helper = require('../helpers/index')

module.exports = {
    //async menunggu data result 
    getStatus: async function (request, response) {
        try {
            const result = await statusModels.getStatus()

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)

        }
    },

    postStatus: async function (request, response) {

        try {

            const setData = request.body
            console.log(setData)
            const result = await statusModels.postStatus(setData)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }


    },

    putStatus: async function (request, response) {

        try {

            const setData = request.body
            const id = request.params.id
            console.log(setData)
            const result = await statusModels.putStatus(setData, id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }


    },

    deleteStatus: async function (request, response) {

        try {

            const id = request.params.id
            const result = await statusModels.deleteStatus(id)

            return helper.response(response, 200, result)
        } catch (error) {
            return helper.response(response, 500, error)
        }


    }


}