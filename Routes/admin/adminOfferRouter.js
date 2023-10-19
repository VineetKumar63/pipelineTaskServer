const express = require ('express')

const AdminOffer = new express.Router();


const {addOffer, viewOffer, updateOffer, updateStatus, findOffer} =  require ('../../Controllers/admin/adminOffersControllers')

AdminOffer.post('/api/admin/offer/createOffer',addOffer)
AdminOffer.get('/api/admin/offer/viewOffer',viewOffer)
AdminOffer.post('/api/admin/offer/findOffer',findOffer)
AdminOffer.post('/api/admin/offer/updateOffer',updateOffer)
AdminOffer.post('/api/admin/offer/updateStatus',updateStatus)

module.exports = {AdminOffer}