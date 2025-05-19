const user = require("../../../backend/src/userModels/user.model")
const Product = require("../productModels/product.model")
const supabase = require("../productUtils/pdb.js")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verify = require('../authMiddleware/product.auth.js')

const addProduct = async(req,res)=>{
    try {
        // const {name, description, price, image, category} = req.body
        // const userId = req.user.id
        // const newProduct  = await prisma.product.create({
        //     data:{name,description,price,image,category,userId},
        // })
        // return res.status(201).json(newProduct)

        const {name, description, price, image, category} = req.body
        const userId = req.user._id
        const newProduct  = await prisma.product.create({
            data:{name,description,price,image,category,userId},
        })
        return res.status(201).json(newProduct)

    }catch(error){
        console.log(error.message)
    }
}

const getAllProducts = async(req,res)=>{
    try {
        const products =  await prisma.product.findMany()
        return res.status(200).json(products)
    }catch(error){
        console.log(error.message)
    }
}

const getProduct = async (req,res)=>{
    try {
        const product = await prisma.product.findUnique({
            where: {id: req.params.id},
        })
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        return res.status(200).json(product)
    }catch(error){
        console.log(error.message)
    }
}

const deleteProduct = async(req,res) =>{
    try {
        const product = await prisma.product.delete({
            where: {id: req.params.id},
        })
        return res.status(200).json({message: "Product deleted successfully"})
    }catch(error){
        console.log(error.message)
    }
}




// const getAllProducts = async(req,res) =>{
//     try {
//         //const products = await Product.find().populate('category').populate('brand').populate('size').
//         const products = await Product.find()
//         return res.status(200).json(products)
//     }
//     catch(error){
//         console.log(error.message)
//     }
// }
// const getProduct = async(req,res) =>{
//     try {
//         const id = req.params.id
//         const product = await Product.findById(id)
//         return res.status(200).json(product)
//     }catch(error){
//         console.log(error.message)
//     }
// }

// const addProduct = async(req,res) =>{
//     try {

//         const{name,description, price, image, category} = req.body;

        
//         const product1 = await Product.create({
//             name: name,
//             description: description,
//             price: price,
//             image: image,
//             category: category
//         })
//         console.log(product1._id)
//         return res.status(201).json({message: "Product added successfully", product: product1})
//     }
//     catch(error){
//         console.log(error.message)
//     }
// }
// const deleteProduct = async(req,res) =>{
//     try {
//         const id = req.params.id
//         const product = await Product.findByIdAndDelete(id)
//         return res.status(200).json({message: "Product deleted successfully", product: product})
//     }catch{
//         console.log(error.message)
//     }
// }

module .exports = {getAllProducts,getProduct,addProduct, deleteProduct}