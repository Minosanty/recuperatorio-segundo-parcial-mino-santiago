
import Language from "../models/language.model.js";
export const crearparadigm = async (req,res)=>{
   const{name,paradigm,release_year }=req.body
   if(req.body){
    for(let valor in req.body){
        if(typeof req.body[valor] === "string"){
            req.body[valor] = req.body[valor].trim();
        }
     }
   }
    try {
        //validacion para que los datos no vengan vacios 
        if(name=== undefined)return res.status(400).json({message:"name no puede estar vacio"});
        if(release_year === undefined)return res.status(400).json({message:"release year no puede estar vacio"});
         if(paradigm=== undefined)return res.status(400).json({message:"paradigm no puede estar vacio"});

        const nameUnico = await Language.findOne({where: {name}});
        if (nameUnico !== null) return res.status(400).json({message: "name exitente"});

        const release_yearInt = Math.floor(release_year);
        if (release_year !== release_yearInt) return res.status(400).json({message: " release year invalido"})


        const Language = await Language.create({name,paradigm,release_year });
        res.status(201).json({message: "se ha creado el paradigm", Language});
        } 
        catch (error) {
        res.status(500).json({mensaje:"error en la creacion del paradigm "});
    }

}