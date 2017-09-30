/* update existing entry */
db.newdata.insert([
   {
       "france": {
           "country_name" : "France",
           "hog" : "Edouard Philippe",
           "hos" : "Emmanuel Macron",
           "hog_pic" : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Edouard_Philippe%2C_le_1er_septembre_2017.jpg/440px-Edouard_Philippe%2C_le_1er_septembre_2017.jpg",
           "hos_pic" : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Emmanuel_Macron_in_Tallinn_Digital_Summit._Welcome_dinner_hosted_by_HE_Donald_Tusk._Handshake_%2836669381364%29_%28cropped%29.jpg/440px-Emmanuel_Macron_in_Tallinn_Digital_Summit._Welcome_dinner_hosted_by_HE_Donald_Tusk._Handshake_%2836669381364%29_%28cropped%29.jpg"
       }
    },
    {
       "germany": {
            "country_name" : "Germany",
            "hog" : "Angela Merkel",
            "hos" : "Frank-Walter Steinmeier",
            "hog_pic": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Angela_Merkel_Juli_2010_-_3zu4.jpg/440px-Angela_Merkel_Juli_2010_-_3zu4.jpg",
            "hos_pic" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Frank-Walter_Steinmeier_Feb_2014_%28cropped%29.jpg/440px-Frank-Walter_Steinmeier_Feb_2014_%28cropped%29.jpg"
       }
    }
])

// update existing entry 
db.newdata.update(
   { "mexico":{$exists:true} },
   {
	$set: {
       "mexico.hos": "Enrique Peña Nieto",

     }
   }
)

// delete unneeded keys 
db.newdata.update(
	{ "mexico":{$exists:true} },
	{ 
		$unset: {
			"hog_pic":""
		}
	}
)

// delete document
db.newdata.deleteOne({"france":{$exists:true}})