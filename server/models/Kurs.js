

const mongoose=require('mongoose')

const KursSchema= new mongoose.Schema({
    isim:{
        type:String
    },
    aciklama:{
        type:String
    },
    durum:{
        type:String,
        enum:['yayında','olusturuluyor','planlanıyor']
    },
    egitmenId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Egitmen'

    }
})

module.exports=mongoose('Kurs',KursSchema)