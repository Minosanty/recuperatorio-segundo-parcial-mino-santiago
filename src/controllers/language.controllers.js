
import Language from "../models/language.model.js";

export const crearlanguage = async (req, res) => {
    const { name, paradigm, release_year } = req.body;
    if (req.body) {
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    }
    try {
        // validación para que los datos no vengan vacíos
        if (name === undefined || name === "") return res.status(400).json({ message: "name no puede estar vacio" });
        if (release_year === undefined || release_year === "") return res.status(400).json({ message: "release year no puede estar vacio" });
        if (paradigm === undefined || paradigm === "") return res.status(400).json({ message: "paradigm no puede estar vacio" });

        const nameUnico = await Language.findOne({ where: { name } });
        if (nameUnico !== null) return res.status(400).json({ message: "name existente" });

        const release_yearInt = Math.floor(release_year);
        if (release_year != release_yearInt) return res.status(400).json({ message: "release year invalido" });

        const nuevoLanguage = await Language.create({ name, paradigm, release_year });
        res.status(201).json({ message: "se ha creado el language", language: nuevoLanguage });
    }
    catch (error) {
        res.status(500).json({ mensaje: "error en la creacion del language" });
    }
};

export const actulizarlanguage = async (req, res) => {
    if (req.body) {
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    }
    const { name, paradigm, release_year } = req.body;

    try {
        if (name) {
            const nombreUnico = await Language.findOne({ where: { name } });
            if (nombreUnico !== null) return res.status(400).json({ message: "nombre existente" });
        }

        const [updated] = await Language.update({ name, paradigm, release_year }, {
            where: { id: req.params.id }
        });
        if (updated === 0) return res.status(400).json({ message: "el lenguaje no existe" });

        return res.status(200).json({ message: "se actualizo el lenguaje" });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "error en la actualizacion del lenguaje" });
    }
};

export const obtenerTodosLoslenguage = async (req, res) => {
    try {
        const lenguaje = await Language.findAll();
        if (lenguaje.length === 0) return res.status(404).json({ message: "no se encontro ningun lenguaje" });

        return res.status(200).json(lenguaje);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const lenguaje = await Language.findByPk(req.params.id);
        if (lenguaje) return res.status(200).json(lenguaje);

        return res.status(404).json({ message: "el lenguaje no existe" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const eliminacion = async (req, res) => {
    try {
        const eliminados = await Language.destroy({ where: { id: req.params.id } });
        console.log(eliminados);

        if (eliminados === 0) return res.status(404).json({ message: "lenguaje no encontrado" });

        res.status(204).json({ message: "lenguaje eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};