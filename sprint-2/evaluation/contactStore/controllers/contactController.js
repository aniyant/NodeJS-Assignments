const { Sequelize } = require("sequelize");
const ContactInformation = require("../models/contactInformation");

async function identify(req,res){
    const {email, phoneNumber } = req.body;

    if(!email && !phoneNumber){
        return res.status(400).json({error: "Email or Phone Number is required"});
    }

    try{
        let primaryContact = null;
        let secondaryContact = [];
        let whereClause = {};

        if(email){
            whereClause.email = email;
        }
        if(phoneNumber){
            whereClause.phoneNumber = phoneNumber;
        }

        primaryContact = await ContactInformation.findOne({
            where: whereClause
        });

        if(!primaryContact){
            primaryContact = await ContactInformation.findOne({
                where:{
                    [Sequelize.Op.or]:[{email},{phoneNumber}],
                },
            });

            if(primaryContact){
                if(email && !primaryContact.email){
                    primaryContact.email = email;
                    await primaryContact.save();
                }
                if(phoneNumber &&!primaryContact.phoneNumber){
                    primaryContact.phoneNumber = phoneNumber;
                    await primaryContact.save();
                }
            }else{
                primaryContact = await ContactInformation.create({email, phoneNumber});
            }
        }
        if(primaryContact){
            secondaryContact = await ContactInformation.findAll({
                where:{
                    primaryContactId:primaryContact.id,
                },
            });

            if(email && primaryContact.email !== email){
                const newSeconday = await ContactInformation.create({
                    email:email,
                    primaryContactId:primaryContact.id
                });
                secondaryContact.push(newSeconday);
            }

            if(phoneNumber && primaryContact.phoneNumber !== phoneNumber){
                const newSeconday = await ContactInformation.create({
                    phoneNumber:phoneNumber,
                    primaryContactId:primaryContact.id
                });
                secondaryContact.push(newSeconday);
            }
        }
      
        const emails = [primaryContact.email, ...secondaryContact.map(sc=>sc.email).filter(e=>e)];
        const phoneNumbers = [primaryContact.phoneNumber,...secondaryContact.map(sc=>sc.phoneNumber).filter(p=>p)];
        const secondaryContactIds = secondaryContact.map(sc=> sc.id);

        res.json({
            contact:{
                primaryContactId:primaryContact.id,
                emails,
                phoneNumbers,
                secondaryContactIds,
            }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

async function searchContacts(req, res){
    const {email, phoneNumber, page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try{
        const whereClause = {};

        if(email){
            whereClause.email = email;
        }
        if(phoneNumber){
            whereClause.phoneNumber = phoneNumber;
        }

        const {count,rows} = await ContactInformation.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        });

        res.json({
            contacts:rows,
            pagination:{
                total:count,
                page,
                pageSize
            }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = {identify, searchContacts};