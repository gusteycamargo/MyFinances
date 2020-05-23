'use strict'

const Category = use('App/Models/Category');

class CategoryController {
    async index ({ request, auth, response }) {        
        const categories = await Category.query().whereRaw('user_id = ?', [auth.user.id]).fetch();
    
        return categories;
    }

    async store ({ request, auth }) {
        const data = request.only(["name"]);
        const store = {
            name: data.username,
            user_id: auth.user.id
        }    
        const category = await Category.create(store);
    
        return category;
      }
    
    //   async show ({ auth, params, response, view }) {
    //     if(auth.user.function === 'adm') {
    //       const user = await User.findOrFail(params.id);
    //       await user.load('campus');
    //       //const users = await Database.select('id', 'username', 'email', 'fullname', 'function', 'status').from('users').query().with('campus').fetch();
    //       //await equipaments.load('campus');
      
    //       return user;
    //     }
    //     else {
    //       return response.status(403).send('Área não autorizada');
    //     } 
    //   }
    
      async update ({ auth, params, response, request }) {
          const category = await Category.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch();
          const data = request.only(['name']);
    
          await category.merge(data);
          await category.save();
          //const users = await Database.select('id', 'username', 'email', 'fullname', 'function', 'status').from('users').query().with('campus').fetch();
          //await equipaments.load('campus');
      
          return category;
      }
    
      async destroy ({ auth, params, response, request }) {
          const category = await Category.query().whereRaw('user_id = ? and id = ?', [auth.user.id, params.id]).fetch();
    
          await category.delete();
          //const users = await Database.select('id', 'username', 'email', 'fullname', 'function', 'status').from('users').query().with('campus').fetch();
          //await equipaments.load('campus');
      
          return category;
      }
}

module.exports = CategoryController
