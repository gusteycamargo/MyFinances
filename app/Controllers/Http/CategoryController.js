'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index ({ request, auth, response }) {        
        const categories = await Category.query().whereRaw('user_id = ?', [auth.user.id]).fetch();
    
        return categories;
    }
}

module.exports = CategoryController
