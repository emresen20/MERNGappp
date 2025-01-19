
const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLSchema}= require('graphql')

const {kurslar,egitmenler}=require('../ornekveri')

const EgitmenType=new GraphQLObjectType({
    name:'Egitmen',
    fields:()=>({
        id:{type:GraphQLID},
        isim:{type:GraphQLString},
        email:{type:GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      egitmen: {
        type: EgitmenType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          // `args.id` string olduğu için sayıya çeviriyoruz
          const id = parseInt(args.id);
          return egitmenler.find((egitmen) => egitmen.id === id);
        },
      },
    },
  });
  



module.exports=new GraphQLSchema({
    query:RootQuery,

})