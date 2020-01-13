export const AdresseSchema = new SimpleSchema({
    ville:{
        type: String,
        max: 100,
        label: 'Ville'
    },
    voie:{
        type:String,
        max:300,
        label: 'Voie'
    },
    zipcode:{
        type:String,
        label: 'Zipcode'
    }
});
