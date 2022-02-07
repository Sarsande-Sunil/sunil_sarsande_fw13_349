const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect(
        "mongodb+srv://sunil:sarsande1234@cluster0.a3pf2.mongodb.net/unit4?retryWrites=true&w=majority"
    );
};

// create step 2 user schemas
const userSchemas = new mongoose.Schema(
    {
    id:{type:Number,required:true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    Adress: { type: String, required: true },
    gender: { type: String, required: true,default:"female" },
    type: { type: String, required: false },
    },
    {
        versionKey: false,
        timestamps:true,
    }

);

// make user  model model
const User = mongoose.model("user", userSchemas);

// create step 3 branch details schemas
const branchdetailsSchemas = new mongoose.Schema(
    {
    id: { type: Number, required: true },
    Name: { type: String, required: true },
    Adress: { type: String, required: true },
    IFSC: { type: String, required: true },
    MICR: { type: Number, required: true },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// make user  model model
const Branch_details = mongoose.model("details", branchdetailsSchemas);

// create step 4 branch Master schemas
const MasteraccountSchemas = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    balance: { type: Number, required: true },
    branchinfo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "details",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// make user  model model
const master_account = mongoose.model("masterac", MasteraccountSchemas);

// create step 5 branch Saving Account details schemas
const savingaccountSchemas = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    accountnumber: { type: Number, required: true, unique: true },
    balance: { type: Number, required: true },
    intrestRate: { type: Number, required: true },
    masterac_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "masterac",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// make user  model model
const Saving_account = mongoose.model("savingac", savingaccountSchemas);

// create step 6 branch fixed Account details schemas
const fixedccountSchemas = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    accountnumber: { type: Number, required: true, unique: true },
    balance: { type: Number, required: true },
    intrestRate: { type: Number, required: true },
    startDate: { type: Number, required: true },
    maturitydate: { type: Number, required: true },
    savingac_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "savingac",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// make user  model model
const fixed_account = mongoose.model("fixedac", fixedccountSchemas);

// curd operatins for bank users --------------------------usercursd------------
// 1post
app.post("/users", async (res, req) => {
    try {
        const users = await User.create(req.body);
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 2 get
app.get("/users", async (res, req) => {
    try {
        const users = await User.find().lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 3patch
app.patch("/users/:id", async (res, req) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id, req.body,
            {
                new: true
            }
        ).lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 4 delete
app.delete("/users/:id", async (res, req) => {
    try {
        const users = await User.deleteMany({balance:0}).lean().exec();
        return res.statu(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// curd operations for details

// curd operatins for bank users --------------------------branch details------------
// 1post
app.post("/branchDetails", async (res, req) => {
    try {
        const details = await Branch_details.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 2 get
app.get("/branchDetails", async (res, req) => {
    try {
        const details = await Branch_details.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 3patch
app.patch("/branchDetails/:id", async (res, req) => {
    try {
        const details = await Branch_details.findByIdAndDelete(req.params.id, req.body,
            {
                new: true
            }
        ).lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 4 delete
app.delete("/branchDetails/:id", async (res, req) => {
    try {
        const details = await Branch_details.deleteMany({balance:0}).lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// curd operatins for bank users --------------------------master account details------------
// 1post
app.post("/maccount", async (res, req) => {
    try {
        const details = await master_account.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 2 get
app.get("/maccount", async (res, req) => {
    try {
        const details = await master_account.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 3patch
app.patch("/maccount/:id", async (res, req) => {
    try {
        const details = await master_account.findByIdAndDelete(req.params.id, req.body,
            {
                new: true
            }
        ).lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 4 delete
app.delete("/maccount/:id", async (res, req) => {
    try {
        const details = await Branch_details.deleteMany({ balance: 0 }).lean().exec();
        return res.statu(201).send(details)
    }
    catch (e) {
        return res.statusCode(500).send(e.message)
    }
});


// curd operatins for bank users --------------------------saving account details------------
// 1post
app.post("/saccount", async (res, req) => {
    try {
        const details = await Saving_account.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 2 get
app.get("/saccount", async (res, req) => {
    try {
        const details = await Saving_account.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 3patch
app.patch("/saccount/:id", async (res, req) => {
    try {
        const details = await Saving_account.findByIdAndDelete(req.params.id, req.body,
            {
                new: true
            }
        ).lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 4 delete
app.delete("/saccount/:id", async (res, req) => {
    try {
        const details = await Saving_account.deleteMany({ balance: 0 }).lean().exec();
        return res.statu(201).send(details)
    }
    catch (e) {
        return res.statusCode(500).send(e.message)
    }
});


// curd operatins for bank users --------------------------fixed account details------------
// 1post
app.post("/faccount", async (res, req) => {
    try {
        const details = await fixed_account.create(req.body);
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 2 get
app.get("/faccount", async (res, req) => {
    try {
        const details = await fixed_account.find().lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 3patch
app.patch("/faccount/:id", async (res, req) => {
    try {
        const details = await fixed_account.findByIdAndDelete(req.params.id, req.body,
            {
                new: true
            }
        ).lean().exec();
        return res.statu(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

// 4 delete
app.delete("/faccount/:id", async (res, req) => {
    try {
        const details = await fixed_account.deleteMany({ balance: 0 }).lean().exec();
        return res.statu(201).send(details)
    }
    catch (e) {
        return res.statusCode(500).send(e.message)
    }
});

app.listen(2352, async function () {
    try {
        await connect();
        console.log("runnimg on port 2352");
    } catch (e) {
        console.log(e.message);
    }
});
