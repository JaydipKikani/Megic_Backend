const { Option_List, Visibilite } = require('../../models/generalsetting');

const createupdateVisibilite = async (req, res) => {
    try {
        if (req.body.optionListData) {
            const { general_info: optionList_general_info, lang, Option_Interior, Option_Exterieur, Option_Confort, description } = req.body.optionListData;

            if (!optionList_general_info || !lang) {
                return res.status(400).json({ status: false, error: true, msg: "General_info and lang are required for Option_List" });
            }

            let optionList = await Option_List.findOne({ general_info: optionList_general_info });

            if (!optionList) {
                optionList = new Option_List({
                    general_info: optionList_general_info,
                    description: {
                        FR: lang === 'FR' ? description || null : null,
                        EN: lang === 'EN' ? description || null : null
                    },
                    Option_Interior: lang === 'FR' ? { FR: Option_Interior || null } : { EN: Option_Interior || null },
                    Option_Exterieur: lang === 'FR' ? { FR: Option_Exterieur || null } : { EN: Option_Exterieur || null },
                    Option_Confort: lang === 'FR' ? { FR: Option_Confort || null } : { EN: Option_Confort || null }
                });
            } else {
                const updateData = {};
                if (lang === 'FR') {
                    updateData.Option_Interior = { FR: Option_Interior !== undefined ? Option_Interior : optionList.Option_Interior.FR };
                    updateData.Option_Exterieur = { FR: Option_Exterieur !== undefined ? Option_Exterieur : optionList.Option_Exterieur.FR };
                    updateData.Option_Confort = { FR: Option_Confort !== undefined ? Option_Confort : optionList.Option_Confort.FR };
                    updateData.description = { FR: description !== undefined ? description : optionList.description.FR };
                    // Retain EN values
                    updateData.Option_Interior = { ...updateData.Option_Interior, EN: optionList.Option_Interior.EN };
                    updateData.Option_Exterieur = { ...updateData.Option_Exterieur, EN: optionList.Option_Exterieur.EN };
                    updateData.Option_Confort = { ...updateData.Option_Confort, EN: optionList.Option_Confort.EN };
                    updateData.description = { ...updateData.description, EN: optionList.description.EN };
                } else if (lang === 'EN') {
                    updateData.Option_Interior = { EN: Option_Interior !== undefined ? Option_Interior : optionList.Option_Interior.EN };
                    updateData.Option_Exterieur = { EN: Option_Exterieur !== undefined ? Option_Exterieur : optionList.Option_Exterieur.EN };
                    updateData.Option_Confort = { EN: Option_Confort !== undefined ? Option_Confort : optionList.Option_Confort.EN };
                    updateData.description = { EN: description !== undefined ? description : optionList.description.EN };
                    // Retain FR values
                    updateData.Option_Interior = { ...updateData.Option_Interior, FR: optionList.Option_Interior.FR };
                    updateData.Option_Exterieur = { ...updateData.Option_Exterieur, FR: optionList.Option_Exterieur.FR };
                    updateData.Option_Confort = { ...updateData.Option_Confort, FR: optionList.Option_Confort.FR };
                    updateData.description = { ...updateData.description, FR: optionList.description.FR };
                }
                optionList.set(updateData);
            }

            await optionList.save();
        }
        if (req.body.visibiliteData) {
            const { general_info: visibilite_general_info, One_Of_One, Electrique, Engine, Consumption, V_Max, RangeData } = req.body.visibiliteData;

            if (!visibilite_general_info) {
                return res.status(400).json({ status: false, error: true, msg: "General_info is required for Visibilite" });
            }

            let visibilite = await Visibilite.findOne({ general_info: visibilite_general_info });

            if (!visibilite) {
                visibilite = new Visibilite({
                    general_info: visibilite_general_info,
                    One_Of_One,
                    Electrique,
                    Engine,
                    Consumption,
                    V_Max,
                    RangeData
                });
            } else {
                visibilite.One_Of_One = One_Of_One;
                visibilite.Electrique = Electrique;
                visibilite.Engine = Engine;
                visibilite.Consumption = Consumption;
                visibilite.V_Max = V_Max;
                visibilite.RangeData = RangeData;
            }

            await visibilite.save();
        }

        res.status(200).json({ status: true, error: false, msg: "Data saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: true, msg: "Internal server error" });
    }
};


module.exports = {
    createupdateVisibilite,
};
