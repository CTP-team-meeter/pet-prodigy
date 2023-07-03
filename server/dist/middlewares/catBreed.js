"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Get all cat breeds
exports.getBreed = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let breed;
        try {
            breed = yield CatBreed.findById(req.params.id);
            if (breed == null) {
                return res.status(404).json({ message: 'Cannot find breed' });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            }
        }
        res.name = breed;
        next();
    });
};
