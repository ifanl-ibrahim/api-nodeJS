const { body } = require('express-validator');

const middlewareConnexion = () => {
    return [
        body('email').isEmail().withMessage('Email invalide'),
        body('password').isStrongPassword({ 
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,
            returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5,
            pointsForContainingLower: 10, pointsForContainingUpper: 10,
            pointsForContainingNumber: 10, pointsForContainingSymbol: 10
        }).withMessage('Le mot de passe doit contenir au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 symbole.'),
        body('firstname').isStrongFirstname({ minLength: 2, minNumbers: 0 }).withMessage('Le prénom doit contenir au moins 2 caractères'),
        body('lastname').isStrongLastname({ minLength: 2, minNumbers: 0 }).withMessage('Le nom doit contenir au moins 2 caractères'),
    ]
}

module.exports = { middlewareConnexion };