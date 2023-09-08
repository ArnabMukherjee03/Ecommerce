const {Address} = require("../models/addressModel");
const {getDataFromToken} = require('../helpers/getData')

exports.newAddress = async(req,res)=>{
    try {
        const id = getDataFromToken(req);
        const data = await req.body;
        const newAddress = new Address({...data,user:id});
        const savedUser = await newAddress.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.updateAddress = async(req,res)=>{
    try {
        const {id} = await req.params;
        const data = await req.body;
        delete data.id;
        
        const updatedaddress = await Address.findByIdAndUpdate(id, data, { new: true });
       
        res.status(201).json(updatedaddress);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getAddress = async(req,res)=>{
    try {
        const id = getDataFromToken(req);
        const address = await Address.find({user:id});
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.deleteAddress = async(req,res)=>{
    try {
        const {id} = await req.params;
        const response = await Address.findByIdAndDelete(id);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}