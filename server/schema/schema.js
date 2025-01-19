
const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLSchema,GraphQLList}= require('graphql')

const {kurslar,egitmenler}=require('../ornekveri')

const EgitmenType=new GraphQLObjectType({
    name:'Egitmen',
    fields:()=>({
        id:{type:GraphQLID},
        isim:{type:GraphQLString},
        email:{type:GraphQLString}
    })
})

const KursType=new GraphQLObjectType({
    name:'Kurs',
    fields:()=>({
        id:{type:GraphQLID},
        isim:{type:GraphQLString},
        aciklama:{type:GraphQLString},
        durum:{type:GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType',
    fields: {
      egitmen: {
        type: EgitmenType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
         
          const id = parseInt(args.id);  // `args.id` string olduğu için sayıya çeviriyoruz
          return egitmenler.find((egitmen) => egitmen.id === id);
        },
      },
      egitmenler:{
        type:new GraphQLList(EgitmenType),
        resolve(parent,args){
            return egitmenler
        }
      },
      kurs:{
        type:KursType,
        args: {id: {type:GraphQLID}},
        resolve(parent,args){
            const id = parseInt(args.id);
            return kurslar.find(kurs=>kurs.id===id)
        }
      },
      kurslar:{
        type:new GraphQLList(KursType),
        resolve(parent,args){
            return kurslar
        }
      }
    },
  });
  



module.exports=new GraphQLSchema({
    query:RootQuery,

})