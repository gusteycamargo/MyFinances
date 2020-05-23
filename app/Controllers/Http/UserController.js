'use strict'

const User = use('App/Models/User');

class UserController {
    async store ({ request }) {
        const data = request.only(["email", "password", "fullname"]);            
        const user = await User.create(data);
    
        return user;
      }

    async index ({ request, auth, response }) {        
        //verificar se é necessário ter esse método

        const users = await User.all();
    
        return users;
    }
    
    async show ({ auth, params, response, view }) {  
        if(auth.user.id == params.id) {
            const user = await User.findOrFail(auth.user.id);
          
            return user;
        }
        else {
            return response.status(403).send('Área não autorizada');
        }
    }
    
    async update ({ auth, params, response, request }) {
        if(auth.user.id == params.id) {

            const user = await User.findOrFail(auth.user.id);
            const data = request.only(['fullname', 'email', 'password']);

            await user.merge(data);
            await user.save();
            //const users = await Database.select('id', 'username', 'email', 'fullname', 'function', 'status').from('users').query().with('campus').fetch();
            //await equipaments.load('campus');
    
            return user;
        }
        else {
            return response.status(403).send('Área não autorizada');
        }
    }
    
      async destroy ({ auth, params, response, request }) {
        if(auth.user.id == params.id) {
            const user = await User.findOrFail(auth.user.id);
        
            await user.delete();
            //const users = await Database.select('id', 'username', 'email', 'fullname', 'function', 'status').from('users').query().with('campus').fetch();
            //await equipaments.load('campus');
        
            return user;
        }
        else {
            return response.status(403).send('Área não autorizada');
        }
      }
}

module.exports = UserController
