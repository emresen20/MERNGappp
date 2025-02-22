const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList,GraphQLNonNull,GraphQLEnumType } = require('graphql');
const Kurs = require('../models/Kurs');
const Egitmen = require('../models/Egitmen');

const EgitmenType = new GraphQLObjectType({
  name: 'Egitmen',
  fields: () => ({
    id: { type: GraphQLID },
    isim: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const KursType = new GraphQLObjectType({
  name: 'Kurs',
  fields: () => ({
    id: { type: GraphQLID },
    isim: { type: GraphQLString },
    aciklama: { type: GraphQLString },
    durum: { type: GraphQLString },
    egitmen: {
      type: EgitmenType,
      resolve(parent, args) {
        // Kurs'un egitmenId alanı üzerinden ilişki kuruyoruz
        return Egitmen.findById(parent.egitmenId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    egitmen: {
      type: EgitmenType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Egitmen.findById(args.id);
      },
    },
    egitmenler: {
      type: new GraphQLList(EgitmenType),
      resolve(parent, args) {
        return Egitmen.find();
      },
    },
    kurs: {
      type: KursType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Kurs.findById(args.id);
      },
    },
    kurslar: {
      type: new GraphQLList(KursType),
      resolve(parent, args) {
        return Kurs.find();
      },
    },
  },
});

const RootMutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{
    egitmenekle:{
      type:EgitmenType,
      args:{
        isim:{
          type:GraphQLNonNull(GraphQLString),
        },
        email:{
          type:GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent,args){
        const egitmen = new Egitmen({
          isim:args.isim,
          email:args.email
        })
        return egitmen.save()
      }
    },
    egitmensil:{
      type:EgitmenType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        return Egitmen.findByIdAndDelete(args.id)
      }
    },
    kursEkle:{
      type:KursType,
      args:{
        isim:{type:GraphQLNonNull(GraphQLString)},
        aciklama:{type:GraphQLNonNull(GraphQLString)},
        durum:{
          type: new GraphQLEnumType({
            name:'KursDurumlar',
            values:{
              'yayin':{value:'yayında'},
              'olus':{value:'olusturuluyor'},
              'plan':{value:'planlanıyor'}
            }
          }),
          defaultValue:'planlanıyor'
        },
        egitmenId:{type:GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        const kurs= new Kurs({
          isim:args.isim,
          aciklama:args.aciklama,
          durum:args.durum,
          egitmenId:args.egitmenId
        })
        return kurs.save()
      }
    },
    kurSil:{
      type:KursType,
      args:{
        id:{type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent,args){
        return Kurs.findByIdAndDelete(args.id)
      }
    },
    kursGuncelle:{
      type:KursType,
      args:{
        id:{type: GraphQLNonNull(GraphQLID)},
        isim:{type: GraphQLString},
        aciklama:{type:GraphQLString},
        durum:{
          type: new GraphQLEnumType({
            name:'KursGuncellemeDurumlar',
            values:{
              'yayin':{value:'yayında'},
              'olus':{value:'olusturuluyor'},
              'plan':{value:'planlanıyor'}
            }
          })
        }
      },
      resolve(parent,args){
        return Kurs.findByIdAndUpdate(args.id,{
          $set:{
            isim:args.isim,
            aciklama:args.aciklama,
            durum:args.durum
          }
        },{new:true})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:RootMutation
});














// const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLSchema,GraphQLList}= require('graphql')


// const Kurs=require('../models/Kurs')
// const Egitmen=require('../models/Egitmen')


// const EgitmenType=new GraphQLObjectType({
//     name:'Egitmen',
//     fields:()=>({
//         id:{type:GraphQLID},
//         isim:{type:GraphQLString},
//         email:{type:GraphQLString}
//     })
// })

// const KursType=new GraphQLObjectType({
//     name:'Kurs',
//     fields:()=>({
//         id:{type:GraphQLID},
//         isim:{type:GraphQLString},
//         aciklama:{type:GraphQLString},
//         durum:{type:GraphQLString},
//         egitmen:{ // burada kurslardaki id ile egitmenin idsini eşliyoruz 
//             type:EgitmenType,
//             resolve(parent,args){
//                 return Egitmen.findById(parent.id)
//             }
//         }
//     })
// })


// const RootQuery = new GraphQLObjectType({ 
//     name: 'RootQueryType',
//     fields: {
//       egitmen: {
//         type: EgitmenType,
//         args: { id: { type: GraphQLID } },
//         resolve(parent, args) {
         
//           //const id = parseInt(args.id);  // `args.id` string olduğu için sayıya çeviriyoruz
//           return Egitmen.findById(args.id)
//         },
//       },
//       egitmenler:{
//         type:new GraphQLList(EgitmenType),
//         resolve(parent,args){
//             return Egitmen.find()
//         }
//       },
//       kurs:{
//         type:KursType,
//         args: {id: {type:GraphQLID}},
//         resolve(parent,args){
//             return Kurs.findById(args.id)
//         }
//       },
//       kurslar:{
//         type:new GraphQLList(KursType),
//         resolve(parent,args){
//             return Kurs.find()
//         }
//       }
//     },
//   });
  



// module.exports=new GraphQLSchema({
//     query:RootQuery,

// })