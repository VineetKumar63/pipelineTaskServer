require('dotenv').config()

const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

////////
const {AdminUser} = require("./Routes/admin/adminUserRouter.js")
app.use("/", AdminUser);

const {AdminRole} = require("./Routes/admin/adminRoleRoutes.js")
app.use("/",AdminRole)

const{AdminRoleAssign} = require("./Routes/admin/adminRoleAssignRouter.js")
app.use('/',AdminRoleAssign)

const{AdminProductCategory} = require("./Routes/admin/adminProductRoutes.js")
app.use('/',AdminProductCategory)

const{AdminProSubCategory} = require("./Routes/admin/adminProSubcategoryRouter.js")
app.use('/',AdminProSubCategory)

const{AdminOffer} = require("./Routes/admin/adminOfferRouter.js")
app.use('/',AdminOffer)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running ..........`)
});
